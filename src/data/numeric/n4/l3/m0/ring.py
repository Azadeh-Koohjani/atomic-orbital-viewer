import numpy as np
import scipy.optimize as opt
import math

def equation(r, costeta):
    return np.exp(-5 * r/2) * 125 * r ** 3 * (5* costeta ** 3 - 3 * costeta) + 3

costeta_0 = 0.723076185995
costeta_1 = 0.094390214892
r = 1.2

costeta_values = np.linspace(costeta_0, costeta_1, 20)
costeta_values = costeta_values[:-1]
pairs = []

r_initial_guess = 0.001
for costeta in costeta_values:
    try:
        r_solution = opt.fsolve(equation, r_initial_guess, args=(costeta,))
        if abs(equation(r_solution[0], costeta)) < 0.0001 and r_solution[0] <= r:
                pair = (r_solution[0] * math.sqrt(1 - costeta**2), r_solution[0] * costeta)
                pairs.append(pair)
                #r_initial_guess = r_solution[0]
                print(r_solution, str(round(pair[0], 4)), str(round(pair[1], 4)))
        else: print("wrong answer " + str(equation(r_solution[0], costeta)), r_solution, str(round(pair[0], 4)), str(round(pair[1], 4)))
    except Exception as e:
        print("Failed to solve")

print("-------------------------------------------------------------")

costeta_values = np.linspace(costeta_1, costeta_0, 50)

r_initial_guess = 2
for costeta in costeta_values:
    try:
        r_solution = opt.fsolve(equation, r_initial_guess, args=(costeta,))
        if abs(equation(r_solution[0], costeta)) < 0.0001 and r_solution[0] >= r:
                pair = (r_solution[0] * math.sqrt(1 - costeta**2), r_solution[0] * costeta)
                pairs.append(pair)
                print(r_solution, str(round(pair[0], 4)), str(round(pair[1], 4)))
                r_initial_guess = r_solution[0]
        else: print("wrong answer " + str(equation(r_solution[0], costeta)), r_solution, str(round(pair[0], 4)), str(round(pair[1], 4)))
    except Exception as e:
        print("Failed to solve")

pairs.append(pairs[0])

str_pairs = ""
for item in pairs:
    str_pairs =  str_pairs + "[" + str(round(item[0], 4)) + "," + str(round(item[1], 4)) + "],"

str_pairs = str_pairs[:-1]

print(str_pairs)