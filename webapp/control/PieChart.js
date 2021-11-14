sap.ui.define([
	"sap/ui/core/Control",
	"chart.js"
], function(Control, Chart) {
	"use strict";

	return Control.extend("sap.ui.demo.todo.control.PieChart", {

		metadata: {
			properties: {
				todos: {type: "object"}
			}
		},

		exit: function() {
			if (this._chart) {
				this._chart.destroy();
			}
		},

		onBeforeRendering: function() {
			if (this._chart) {
				this._chart.destroy();
			}
		},

		onAfterRendering: function() {
			// determine the open/completed todos
			var open = 0, completed = 0, todos = this.getTodos();
			todos.forEach(function(todo) {
				if (todo.completed) {
					completed++;
				} else {
					open++;
				}
			});

			// render the chart
			this._chart = new Chart(this.getDomRef(), {
				type: 'pie',
				responsive: false,
				data: {
					labels: [
						'Open',
						'Completed'
					],
					datasets: [{
						label: 'Open/Completed Todos',
						data: [open, completed],
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)'
						],
						hoverOffset: 4
					}]
				}
			});
		},

		renderer: {
			apiVersion: 2,
			render: function(oRm, oControl) {
				oRm.openStart("canvas", oControl);
				oRm.style("margin", "5em");
				oRm.openEnd();
				oRm.close("canvas");
			}
		}

	});

});
