import mpmath as mp

f=lambda costeta: 125*(6/5)**3*(5*costeta**3 - 3*costeta)*mp.e**(-5*6/5/2) + 3

df=lambda costeta: mp.diff(f, costeta)

roots=set()
for a in [i*0.001 for i in range(0,1000)]:
    b=a+0.001
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