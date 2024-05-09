//=============================================================================
// AroundEvent.js
//============================================================================

/*:
 * @plugindesc ActionScriptEnemy layout.
 * @author T.Sugiura
 *
 * @help This plugin does not provide plugin commands.
 *
 *  
 */

/*:ja
 * @plugindesc MVプラグインでの、Enemy徘徊視界プラグイン（視界の範囲に入ったら、このイベントのセルフスイッチDがONになります！）
 * @author T.Sugiura
 *
 * 
 * @help
 *
 * Plugin Command:
 *   AroundEvent
 *  
 *  
 */
 
 (function() 
 {
 	
 	var parameters = PluginManager.parameters('AroundEvent');

	//var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if(command === "AroundEvent")
		{
			var EventInfo = this.character( this.eventId() );
			var PlayerInfo = this.character(-1);
			
			//イベントの向き
			switch(EventInfo._direction)
			{
			
				//下向き
				case 2:
					if( (PlayerInfo._x <= EventInfo._x + 1) && (PlayerInfo._x >= EventInfo._x - 1) )
					{
						if( (PlayerInfo._y <= EventInfo._y + 3) && (PlayerInfo._y >= EventInfo._y + 1) )
						{
							SerchAction(EventInfo, this.eventId() );
						}
					}
				break;
				
				//左向き
				case 4:
					if( (PlayerInfo._x <= EventInfo._x - 1) && (PlayerInfo._x >= EventInfo._x - 3) )
					{
						if( (PlayerInfo._y <= EventInfo._y + 1) && (PlayerInfo._y >= EventInfo._y - 1) )
						{
							SerchAction(EventInfo, this.eventId() );
						}
					}
					
				break;
				
				//右向き
				case 6:
					if( (PlayerInfo._x <= EventInfo._x + 3 ) && (PlayerInfo._x >= EventInfo._x + 1) )
					{
						if( (PlayerInfo._y <= EventInfo._y + 1) && (PlayerInfo._y >= EventInfo._y - 1) )
						{
							SerchAction(EventInfo, this.eventId() );
						}
					}
				break;
				
				//上向き
				case 8:
					if( (PlayerInfo._x <= EventInfo._x + 1 ) && (PlayerInfo._x >= EventInfo._x - 1) )
					{
						if( (PlayerInfo._y <= EventInfo._y - 1) && (PlayerInfo._y >= EventInfo._y - 3) )
						{
							SerchAction(EventInfo, this.eventId() );
						}
					}
				break;
				
				default:
				break;
			}
		}
	}
 	
 	/*===============================================
 					見つかった時の処理
 	  ===============================================*/
 	function SerchAction( myEvent, eventId )
 	{
 	
 		myEvent.requestBalloon(1);
 		
 		myEvent.forceMoveRoute( {
		"list":
			[
				{"code":14,"parameters":[0,0]},
				{"code":0},
			],
							
			"repeat":false,
			"skippable":true,
			"wait":true
			
			} );
		
		
		key = [$gameMap._mapId, eventId, "D"];
		$gameSelfSwitches.setValue(key, true);			//セルフスイッチDON

 	}
 	
 })();