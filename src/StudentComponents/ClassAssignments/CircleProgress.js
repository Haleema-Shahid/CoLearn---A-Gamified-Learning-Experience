//this component displays marks
//gray when not marked
//red when marked and below avg
//yellow at average
//green when well done


function CircleProgress({percentage, circleWidth, marked}){

    const radius=85;
    let dashArray=radius*Math.PI*2;
    let dashOffset=dashArray-(percentage*dashArray)/100;
    let colorProgress="#1e3c72";

    if(marked==false)
    {
        colorProgress="gray";
        dashArray=radius*Math.PI*2;
        dashOffset=dashArray-(100*dashArray)/100;


    }
    else if(percentage<50)
    {
        colorProgress="#ff6242";
    }
    else 
    colorProgress="#1e3c72";
    

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth} `} >
        <circle style={{fill:"none", stroke: "#dddd"}} cx={circleWidth/2} cy={circleWidth/2} strokeWidth="15px" r={radius}>{percentage}</circle>
        <circle style={{fill:"none", stroke: `${colorProgress}`, strokeDasharray:dashArray, strokeDashoffset:dashOffset}} transform={`rotate (-90 ${circleWidth/2} ${circleWidth/2})`} cx={circleWidth/2} cy={circleWidth/2} strokeWidth="15px" r={radius}></circle>
        <text style={{ fill: `${colorProgress}`, fontSize: "2rem", fontWeight: "bold", textAnchor: "middle", dominantBaseline: "middle" }} x="50%" y="50%">
            {percentage}%
        </text>
        </svg>
        </div>

    );


}
export default CircleProgress;
