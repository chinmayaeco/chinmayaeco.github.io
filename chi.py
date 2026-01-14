import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

st.set_page_config(page_title="Advanced Econ Sim")
st.title("Market Dynamics: Elasticity & Shocks")

# --- Sidebar Configuration ---
st.sidebar.header("Consumer Sensitivity (Demand)")
d_slope = st.sidebar.slider("Demand Elasticity (Steep = Inelastic)", 0.1, 5.0, 1.0)
d_intercept = st.sidebar.slider("Market Size (Demand Shift)", 50, 200, 100)

st.sidebar.header("Producer Sensitivity (Supply)")
s_slope = st.sidebar.slider("Supply Elasticity (Steep = Fixed Capacity)", 0.1, 5.0, 1.0)
s_intercept = st.sidebar.slider("Production Cost (Supply Shift)", 0, 50, 10)

# --- Math Logic ---
# Solving for Equilibrium: d_int - d_slope*P = s_int + s_slope*P
# P * (s_slope + d_slope) = d_int - s_int
eq_price = (d_intercept - s_intercept) / (s_slope + d_slope)
eq_qty = s_intercept + (s_slope * eq_price)

# --- Visualization ---
p_axis = np.linspace(0, 120, 100)
d_line = d_intercept - (d_slope * p_axis)
s_line = s_intercept + (s_slope * p_axis)

fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(d_line, p_axis, label="Demand", color="#1f77b4", lw=3)
ax.plot(s_line, p_axis, label="Supply", color="#ff7f0e", lw=3)

# Add Equilibrium Lines
ax.axhline(eq_price, color='gray', linestyle='--', alpha=0.5)
ax.axvline(eq_qty, color='gray', linestyle='--', alpha=0.5)
ax.scatter(eq_qty, eq_price, color='black', s=100, zorder=5, label=f'Equilibrium: ${eq_price:.2f}')

ax.set_ylim(0, 100)
ax.set_xlim(0, 200)
ax.set_ylabel("Price ($)")
ax.set_xlabel("Quantity (Units)")
ax.legend()
st.pyplot(fig)

# --- Data Readout ---
col1, col2 = st.columns(2)
col1.metric("Equilibrium Price", f"${eq_price:.2f}")
col2.metric("Equilibrium Quantity", f"{int(eq_qty)} units")
