
function align(direction){
	if([selection count] < 2){
	  [doc showMessage:"Please select 2 or more layers."]
	}else {
		var layers = []
		for (var i=0; i < [selection count]; i++){
			layerName = selection[i].name()
			layers.push(layerName)
		}

		switch (direction){
			case "left":
				var getKeyPosition = function(keyFrame){
					keyCoordinate = [keyFrame minX]
				}
				var alignObj = function(frame){
					[frame setMinX:keyCoordinate]
				}
				break;
			case "right":
				var getKeyPosition = function(keyFrame){
					keyCoordinate = [keyFrame maxX]
				}
				var alignObj = function(frame){
					[frame setMaxX:keyCoordinate]
				}
				break;
			case "top":
				var getKeyPosition = function(keyFrame){
					keyCoordinate = [keyFrame minY]
				}
				var alignObj = function(frame){
					[frame setMinY:keyCoordinate]
				}
				break;
			case "bottom":
				var getKeyPosition = function(keyFrame){
					keyCoordinate = [keyFrame maxY]
				}
				var alignObj = function(frame){
					[frame setMaxY:keyCoordinate]
				}
				break;
			case "vertical center":
				var getKeyPosition = function(keyFrame){
					keyCoordinate = [keyFrame midY]
				}
				var alignObj = function(frame){
					[frame setMidY:keyCoordinate]
				}
				break;
			case "horizontal center":
				var getKeyPosition = function(keyFrame){
					keyCoordinate = [keyFrame midX]
				}
				var alignObj = function(frame){
					[frame setMidX:keyCoordinate]
				}
				break;
		}

		var choice = createSelect('Align ' + direction +' relative to', layers, 0)
		// confirm
		if( choice[0] == 1000 ){
			var index = choice[1]
			keyLayer = [selection objectAtIndex:index]
			keyFrame = [keyLayer frame]
			getKeyPosition(keyFrame)
			for (var i=0; i < [selection count]; i++){
		  	layer = [selection objectAtIndex:i]
		  	frame = [layer frame]
		  	alignObj(frame)
			}
		}
	}
}

function createSelect(msg, items, selectedItemIndex){
	selectedItemIndex = selectedItemIndex || 0
	var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)]
	[accessory addItemsWithObjectValues:items]
	[accessory selectItemAtIndex:selectedItemIndex]

	var alert = [[NSAlert alloc] init]
  [alert setMessageText:msg]
  [alert addButtonWithTitle:'OK']
  [alert addButtonWithTitle:'Cancel']
  [alert setAccessoryView:accessory]

  var responseCode = [alert runModal]
  var sel = [accessory indexOfSelectedItem]

  return [responseCode, sel]
}