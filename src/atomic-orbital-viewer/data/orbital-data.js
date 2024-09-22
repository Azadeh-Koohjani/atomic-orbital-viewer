let orbitals = [
    {
        regions: [
            { start: 0.111833, end: 3.57715, valueS: 0, valueE: 0, color: 0xc40000, func: undefined },
            { start: -3.57715, end: -0.1118333, valueS: 0, valueE: 0, color: 0x00b5b5, func: undefined }
        ],
        func: z => {
            return { x: Math.sqrt(Math.pow(Math.log(10 * Math.abs(z)), 2) - Math.pow(z, 2)), z };
        }
    },
    {
        regions: [
            {
                start: 0.253871, end: 6.84185, valueS: 0, valueE: 0, color: 0x00b5b5
                , func: k => {
                    let x = Math.sqrt(2.0 / 3.0) * Math.sqrt(4 * Math.pow(Math.log(Math.sqrt(20) * k), 2) - Math.pow(k, 2));
                    let z = Math.sqrt(Math.pow(k, 2) + Math.pow(x, 2) / 2);
                    return { x, z };
                }
            },
            {
                start: -6.84185, end: -0.253871, valueS: 0, valueE: 0, color: 0x00b5b5
                , func: k => {
                    let x = Math.sqrt(2.0 / 3.0) * Math.sqrt(4 * Math.pow(Math.log(- Math.sqrt(20) * k), 2) - Math.pow(k, 2));
                    let z = - Math.sqrt(Math.pow(k, 2) + Math.pow(x, 2) / 2);
                    return { x, z };
                }
            },
            {
                start: 0.382966, end: 5.8279, valueS: 0, valueE: 0, color: 0xc40000, transverse: true, symmetric: true
                , func: k => {
                    let z = Math.sqrt(1 / 3) * Math.sqrt(4 * Math.pow(Math.log( Math.sqrt(10) * k), 2) - Math.pow(k, 2));
                    let x = Math.sqrt(Math.pow(k, 2) + 2 * Math.pow(z, 2));
                    return { x, z };
                }
            }
        ]
    },
    {
        regions: [
            {
                color: 0x00b5b5, points: [
                    [0.0,0.424],[0.377,0.617],[0.571,0.81],[0.744,1.002],[0.909,1.195],[1.07,1.387],[1.228,1.58],[1.384,1.773],[1.539,1.965],[1.692,2.158],[1.844,2.35],[1.995,2.543],[2.144,2.736],[2.291,2.928],[2.436,3.121],[2.579,3.313],[2.719,3.506],[2.856,3.699],[2.989,3.891],[3.119,4.084],[3.244,4.276],[3.363,4.469],[3.477,4.662],[3.584,4.854],[3.683,5.047],[3.774,5.239],[3.856,5.432],[3.929,5.625],[3.991,5.817],[4.041,6.01],[4.08,6.202],[4.105,6.395],[4.118,6.588],[4.117,6.78],[4.102,6.973],[4.071,7.165],[4.025,7.358],[3.963,7.551],[3.884,7.743],[3.785,7.936],[3.668,8.128],[3.528,8.321],[3.364,8.514],[3.172,8.706],[2.946,8.899],[2.68,9.091],[2.358,9.284],[1.956,9.477],[1.403,9.669],[0.004,9.862]
                ]
            },
            {
                color: 0xc40000, points: [
                    [0.0,-0.424],[0.377,-0.617],[0.571,-0.81],[0.744,-1.002],[0.909,-1.195],[1.07,-1.387],[1.228,-1.58],[1.384,-1.773],[1.539,-1.965],[1.692,-2.158],[1.844,-2.35],[1.995,-2.543],[2.144,-2.736],[2.291,-2.928],[2.436,-3.121],[2.579,-3.313],[2.719,-3.506],[2.856,-3.699],[2.989,-3.891],[3.119,-4.084],[3.244,-4.276],[3.363,-4.469],[3.477,-4.662],[3.584,-4.854],[3.683,-5.047],[3.774,-5.239],[3.856,-5.432],[3.929,-5.625],[3.991,-5.817],[4.041,-6.01],[4.08,-6.202],[4.105,-6.395],[4.118,-6.588],[4.117,-6.78],[4.102,-6.973],[4.071,-7.165],[4.025,-7.358],[3.963,-7.551],[3.884,-7.743],[3.785,-7.936],[3.668,-8.128],[3.528,-8.321],[3.364,-8.514],[3.172,-8.706],[2.946,-8.899],[2.68,-9.091],[2.358,-9.284],[1.956,-9.477],[1.403,-9.669],[0.004,-9.862]
                ]
            },
            {
                color: 0x00b5b5, points: [
                    [1.951,-0.062],[1.436,-0.068],[1.211,-0.077],[1.074,-0.085],[0.98,-0.093],[0.91,-0.101],[0.856,-0.109],[0.811,-0.117],[0.774,-0.124],[0.743,-0.131],[0.716,-0.138],[0.692,-0.145],[0.672,-0.152],[0.653,-0.159],[0.637,-0.166],[0.622,-0.173],[0.608,-0.181],[0.596,-0.188],[0.585,-0.195],[0.575,-0.202],[0.566,-0.21],[0.557,-0.217],[0.549,-0.225],[0.542,-0.233],[0.536,-0.242],[0.53,-0.25],[0.525,-0.259],[0.521,-0.269],[0.517,-0.278],[0.513,-0.289],[0.511,-0.3],[0.509,-0.311],[0.508,-0.324],[0.508,-0.337],[0.508,-0.352],[0.51,-0.368],[0.513,-0.386],[0.518,-0.406],[0.525,-0.428],[0.535,-0.455],[0.548,-0.487],[0.567,-0.526],[0.594,-0.575],[0.635,-0.643],[0.703,-0.745],[0.838,-0.93],[1.308,-1.524],
                    [2.784,-3.243],[3.953,-4.388],[4.547,-4.816],[4.974,-5.034],[5.318,-5.148],[5.61,-5.199],[5.866,-5.208],[6.094,-5.187],[6.3,-5.143],[6.489,-5.081],[6.661,-5.005],[6.82,-4.918],[6.966,-4.821],[7.101,-4.716],[7.225,-4.605],[7.339,-4.487],[7.444,-4.365],[7.539,-4.238],[7.626,-4.108],[7.705,-3.974],[7.775,-3.838],[7.837,-3.699],[7.891,-3.558],[7.937,-3.415],[7.975,-3.27],[8.006,-3.125],[8.027,-2.978],[8.041,-2.83],[8.046,-2.681],[8.042,-2.532],[8.029,-2.383],[8.006,-2.234],[7.973,-2.084],[7.929,-1.935],[7.873,-1.787],[7.805,-1.639],[7.721,-1.492],[7.621,-1.346],[7.502,-1.201],[7.36,-1.058],[7.191,-0.917],[6.987,-0.778],[6.736,-0.642],[6.421,-0.509],[6.006,-0.381],[5.412,-0.257],[4.367,-0.138],
                    [1.951,-0.062]
                ]
            },
            {
                color: 0xc40000, points: 
                    [[1.951,0.062],[1.436,0.068],[1.211,0.077],[1.074,0.085],[0.98,0.093],[0.91,0.101],[0.856,0.109],[0.811,0.117],[0.774,0.124],[0.743,0.131],[0.716,0.138],[0.692,0.145],[0.672,0.152],[0.653,0.159],[0.637,0.166],[0.622,0.173],[0.608,0.181],[0.596,0.188],[0.585,0.195],[0.575,0.202],[0.566,0.21],[0.557,0.217],[0.549,0.225],[0.542,0.233],[0.536,0.242],[0.53,0.25],[0.525,0.259],[0.521,0.269],[0.517,0.278],[0.513,0.289],[0.511,0.3],[0.509,0.311],[0.508,0.324],[0.508,0.337],[0.508,0.352],[0.51,0.368],[0.513,0.386],[0.518,0.406],[0.525,0.428],[0.535,0.455],[0.548,0.487],[0.567,0.526],[0.594,0.575],[0.635,0.643],[0.703,0.745],[0.838,0.93],[1.308,1.524],[2.784,3.243],[3.953,4.388],[4.547,4.816],[4.974,5.034],[5.318,5.148],[5.61,5.199],[5.866,5.208],[6.094,5.187],[6.3,5.143],[6.489,5.081],[6.661,5.005],[6.82,4.918],[6.966,4.821],[7.101,4.716],[7.225,4.605],[7.339,4.487],[7.444,4.365],[7.539,4.238],[7.626,4.108],[7.705,3.974],[7.775,3.838],[7.837,3.699],[7.891,3.558],[7.937,3.415],[7.975,3.27],[8.006,3.125],[8.027,2.978],[8.041,2.83],[8.046,2.681],[8.042,2.532],[8.029,2.383],[8.006,2.234],[7.973,2.084],[7.929,1.935],[7.873,1.787],[7.805,1.639],[7.721,1.492],[7.621,1.346],[7.502,1.201],[7.36,1.058],[7.191,0.917],[6.987,0.778],[6.736,0.642],[6.421,0.509],[6.006,0.381],[5.412,0.257],[4.367,0.138],[1.951,0.062]]
            }
        ]
    }
];
export { orbitals }