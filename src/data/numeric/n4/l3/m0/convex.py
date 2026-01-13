import numpy as np
import mpmath as mp
import scipy.optimize as opt

def cosine_spaced_points(a: float, b: float, n: int):
    theta = np.linspace(0, np.pi, n)
    x = (a + b)/2 + (a - b)/2 * np.cos(theta)
    return x

def equation(r, z):
    return (5*125*z**3 - 3*125*z*r**2) * np.exp(-5 * r/2) - 3

z_first = 0.292020042264
z_last = 3.143570594881
z_values = cosine_spaced_points(z_first, z_last, 50)
z_values = z_values[1:-1]
pairs = []
str_pairs = ''

for z in z_values:
    try:
        r_initial_guess = z
        r_solution = opt.fsolve(equation, r_initial_guess, args=(z,))
        x_solution = np.sqrt(r_solution**2 - z**2)
        pairs.append((round(z, 4), round(x_solution[0], 4)))
        str_pairs = str_pairs + "[" + str(round(x_solution[0], 4)) + "," + str(round(z, 4)) + "],"
    except Exception as e:
        print("Failed to solve")

str_pairs = "[0," + str(round(z_first, 4)) + "]," + str_pairs + "[0," + str(round(z_last, 4)) + "]"

print(str_pairs)
# Print the pairs
# for pair in pairs:
#     print(pair)

