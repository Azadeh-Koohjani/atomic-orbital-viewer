# Atomic Orbital 3D Viewer
This project is an interactive **web-based 3D viewer for atomic orbitals**, deployed on [CodeSandbox](https://fwnlyk-5173.csb.app/), designed to help students, educators, and enthusiasts explore the shapes and probability distributions of orbitals in quantum mechanics. 

Using modern web technologies, the application lets you navigate orbitals in real time, rotate and zoom in 3D space, and visualize cross-sectional probability diagrams at chosen intersections.

**Features**:
- Real-time 3D navigation of orbitals (rotate, zoom, pan)
- Interactive cross-sectional diagrams showing probability distributions
- Clear mathematical background (see below for formulas and derivations)

![Screenshot of Atomic Orbital Viewer](https://github.com/TaqBostan/content/blob/main/atomic-orbital-viewer.png?raw=true)

# Hydrogenic Wavefunctions

Because the atomic orbitals are described with a time-independent potential V, Schrödinger’s equation can be solved using the technique of separation of variables, so that any wavefunction has the form:

$$ \psi_{nlm} = R_{nl}(r)\times Y_{l}^{m}(\theta,\phi) $$

𝑅⁡(𝑟) is the radial wavefunction and 𝑌⁡(𝜃,𝜙) is the angular wavefunction:

$$
R_{n\ell}(r) =
\left(\frac{2Z}{na_0}\right)^{3/2}
\sqrt{\frac{(n-\ell-1)!}{2n\ (n+\ell)!}}
\  e^{-\rho/2}\ \rho^{\ell}\ 
L^{2\ell+1}_{\  n-\ell-1}(\rho),
$$

$$
Y_{\ell}^{m}(\theta,\phi) =
(-1)^{m}\ 
\sqrt{\frac{2\ell + 1}{4\pi}\  \frac{(\ell - m)!}{(\ell + m)!}}
\  P_{\ell}^{m}(\cos\theta)\  e^{i m \phi},
$$

where

$$
\rho = \frac{2Zr}{na_0}, \ 
a_0 = \text{Bohr radius}.
$$

and

- $\ell = 0, 1, 2, \dots$ (orbital quantum number),
- $m = -\ell, -\ell+1, \dots, \ell$ (magnetic quantum number),
- $L^{k}_{m}(\rho)$ is the associated Laguerre polynomial.
- $P_{\ell}^{m}(x)$ is the associated Legendre polynomial.

## A Specific Case $`(n = 4, \ell = 3, m = 0)`$

For this case:

$$
n - \ell - 1 = 0 \ \Rightarrow\  L^{7}_{0}(\rho) = 1
$$

We use $`5Zr/2a_0 \Rightarrow r`$ conversion to place $\psi_{nlm}$ in the range $`(-5, 5)`$. Thus,

$$
\psi_{4,3,0} = R_{4,3}(r)\times Y_{3}^{0}(\theta,\phi) =
C\  e^{-5r/2} \big(5z^3 - 3zr^2\big).
$$

where

$$
C =
\frac{125}{4}
\sqrt{\left(\frac{2Z}{na_0}\right)^{3}\frac{1}{6!\pi}}
$$

To depict $\psi$ in three dimensions, we set it equal to a relatively small constant value:

$$
e^{-5r/2} \big(5z^3 - 3zr^2\big) = \pm\frac{3}{125} \ \ \ \ \text{or}\ \ \ \ 
r^3e^{-5r/2} \big(5\cos^3\theta - 3\cos\theta\big) = \pm\frac{3}{125}
$$

This $4f_{z(5z2−3)}$ orbital consists of two toroidal lobes (annular regions) near the nucleus and two outer lobes (convex regions) extending away from the nucleus. 

### Outer Lobes

To draw the upper convex region, we first need to find the bounds of $z$. Since the shape is symmetric about the z-axis, we solve the equation for positive values ​​and $r = z$, which gives us two values ​​for $z$ ([python code](/src/data/numeric/n4/l3/m0/convex-z-limit.py)).

$$
z^3 e^{-5z/2} = +\frac{3}{250}
 \Rightarrow (z_1, z_2)
$$

To find the intersection points in the xz-plane, we use these two values ​​as initial values ​​for numerical calculations ([python code](/src/data/numeric/n4/l3/m0/convex.py)).

### Toroidal Lobes

To draw the upper annular region, we first find the bounds of $\cos\theta$. Since $\mathrm d \theta = 0$ at upper and lower bounds, $\frac{\mathrm d}{\mathrm d r} \psi = 0$ equation yields $r$ at these points ([python code](/src/data/numeric/n4/l3/m0/ring-costeta-limit.py)).

$$
\mathrm d \theta = 0,\  \frac{\mathrm d}{\mathrm d r} \psi = 0\  \Rightarrow\  r=6/5
$$

Thus

$$
r^3e^{-5r/2} \big(5\cos^3\theta - 3\cos\theta\big) = -\frac{3}{125}, r=6/5\  \Rightarrow\  (\theta_1, \theta_2)
$$

To find the intersection points in the xz-plane, we use these two values ​​as initial values ​​for numerical calculations ([python code](/src/data/numeric/n4/l3/m0/ring.py)).

### Probability Distribution

$$
\psi_{4,3,0}^2 = \big(R_{4,3}(r)\times Y_{3}^{0}(\theta,\phi)\big)^2
$$

To normalize $\psi^2$, we can find the maximum values ​​of $\psi$ for the convex and annular regions, which lie at $x = 0, y = 0$ for the former, and $\theta \sim (\theta_1 + \theta_2)/2$ for the latter. Therefore, we only need to use numerical calculations to find the maximum value of univariate functions.

To calculate the probability density accurately, we need to calculate the coefficient through:

$$
\int\limits_{r,\theta,\phi} \psi_{4,3,0}^2 = 1
$$

which we have skipped here.

# References
[Hydrogen-like atom](https://en.wikipedia.org/wiki/Hydrogen-like_atom)

## Radial part
[Non-relativistic wavefunction and energy](https://en.wikipedia.org/wiki/Hydrogen-like_atom#Non-relativistic_wavefunction_and_energy)

[Laguerre polynomials](https://en.wikipedia.org/wiki/Laguerre_polynomials#Recursive_definition,_closed_form,_and_generating_function)

## Angular part
[Table of spherical harmonics](https://en.wikipedia.org/wiki/Table_of_spherical_harmonics)

## Articles
[ Radial and Angular Parts of Atomic Orbitals](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Quantum_Mechanics/10%3A_Multi-electron_Atoms/Radial_and_Angular_Parts_of_Atomic_Orbitals)

[Representing Atomic Orbitals](https://chemistry.tcd.ie/staff/people/sd/lectures/MO_lecture_course-2.pdf)

## Other 3D Viewers
[Cubic Harmonics](https://www.cond-mat.de/teaching/QM/JSim/spherharm.html)