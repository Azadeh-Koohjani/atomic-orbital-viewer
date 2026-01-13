import mpmath as mp

f=lambda r: 2*(125*r**3)*mp.e**(-5*r/2)-3

df=lambda r: mp.diff(f, r)

roots=set()
for a in [i*0.1 for i in range(0,1001)]:
    b=a+0.1
    try:
        if f(a)==0:
            roots.add(round(a,10))
        if f(a)*f(b)<0:
            r=mp.findroot(f,(a,b))
            roots.add(round(float(r),12))
    except Exception as e:
        pass

roots_list=sorted(list(roots))
    
print(roots_list)
print(a)