const { intersection } = require("lodash");

(function( $ ) {
    $.fn.doughnut = function(data) {
        var summary = 0;
            angle = [];
            currPosition = [-0.5*Math.PI];
            colors = ["#FFE39C", "#6FCF97", "#BC9CFF", "#909090"];

        var calcSummary = function(data) {
            summ = (x, y) => x + y;
            summary = data.reduce(summ);
            return summary;
        };

        var calcAngle = function(data) {
            data.forEach(function(item, i, data) {
                angle[i] = item/summary*100*0.062831853071796;
                return angle;
            })
        };

        var calcPosition = function(angle) {
            for (let i = 1; i < angle.length; i++) {
                currPosition[i] = currPosition[i-1] - angle[i-1];
            }
        };


        var doughnutTemplate = function(target) {
            let self = this;

            self.container = $("<div/>").appendTo(target);
            self.container.addClass("doughnutContainer");

            self.doughnutWrapper = $("<div/>").appendTo(container);
            self.doughnutWrapper.addClass("doughnutWrapper");

            self.doughnutCanvas = $("<canvas/>").appendTo(doughnutWrapper);
            self.doughnutCanvas.addClass("doughnutCanvas");

            self.doughnutScore = $("<div/>").appendTo(doughnutWrapper);
            self.doughnutScore.addClass("doughnutWrapper__score");

            self.doughnutTranscript = $("<div/>").appendTo(container);
            self.doughnutTranscript.addClass("doughnutTranscript");

            var transcripts = ["Великолепно", "Хорошо", "Удовлетворительно", "Разочарован"];

            for (let i = 0; i < transcripts.length; i++) {
                self.elementColor = $("<div/>").appendTo(doughnutTranscript);
                self.elementColor.addClass("doughnutTranscript__color_" + i);

                self.elementText = $("<div/>").appendTo(doughnutTranscript);
                self.elementText.addClass("doughnutTranscript__text");
                self.elementText.text(transcripts[i]);
            }
        };

        var doughnutBuild = function(data, target) {
            calcSummary(data);
            calcAngle(data);
            calcPosition(data);

            var canvas = $(".doughnutCanvas")[0];
                canvas.width = 120;
                canvas.height = 120;

            var context = canvas.getContext("2d");

            context.lineWidth = 4;
            for (let i = 1; i < angle.length; i++) {
                currPosition[i] = currPosition[i-1] - angle[i-1];
            };

            currPosition[4] = (-0.5*Math.PI);

            for (let i = 0; i < data.length; i++) {
                context.beginPath();
                context.strokeStyle = colors[i];
                if (data[i] == 0) {
                    context.arc(60, 60, 58,currPosition[i],currPosition[i], true);
                } else {
                    context.arc(60, 60, 58,currPosition[i],currPosition[i+1] + 0.0174533, true);
                }
                context.stroke();
            }


        }

        var score = function(data) {
            calcSummary(data);
            $(".doughnutWrapper__score").text(summary + " голосов");
        }

        doughnutTemplate(this);
        doughnutBuild(data, this);
        score(data)

    }
})(jQuery)


var $doughnut = $(".test").doughnut([130, 65, 65, 0]);