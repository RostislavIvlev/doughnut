function init(data) {
    var canvas = document.getElementById("test");
        canvas.width = 120;
        canvas.height = 120;

    var context = canvas.getContext("2d");
        context.beginPath();
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.stroke();


    var summary = 0;
        angle = [];
        position = [-0.5*Math.PI];

        colors = ["#FFE39C", "#6FCF97", "#BC9CFF", "#909090"];

    function buildDoughnut(data) {
        summ = (x, y) => x + y;
        summary = data.reduce(summ);
        data.forEach(function(item, i, data) {
            angle[i] = item/summary*100*0.062831853071796;
        })
        
        for (let i = 1; i < angle.length; i++) {
            position[i] = position[i-1] - angle[i-1];
        }

        context.lineWidth = 4;
        position[4] = (-0.5*Math.PI);

        for (let i = 0; i < data.length; i++) {
            context.beginPath();
            context.strokeStyle = colors[i];
            if (data[i] == 0) {
                context.arc(60, 60, 58, position[i], position[i], true);
            } else {
                context.arc(60, 60, 58, position[i], position[i+1] + 0.0174533, true);
            }
            context.stroke();
        }


    }

    buildDoughnut(data);
}
