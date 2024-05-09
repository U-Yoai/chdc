//=============================================================================
// PP_IceFloor.js
//
// Copyright (c) 2020 punipunion
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 氷の床を作るための機能をまとめたプラグインです。
 * @author punipunion
 * @help
 * 
 * @param iceFloorRegionId
 * @desc 氷の床で使用するリージョンIDです。
 * @type number
 * @min 1
 * @max 255
 * @default 7
 */

(function () {
    'use strict';

    var parameters = PluginManager.parameters('PP_IceFloor');
    var iceFloorRegionId = parseInt(parameters['iceFloorRegionId']);

    Game_Map.prototype.isPositionIceFloor = function(x, y) {
        return this.regionId(x, y) === iceFloorRegionId;
    };

    // 指定回数前方に移動
    Game_Player.prototype.moveStraightByTimes = function(times) {
        var list = [];
        for (var i = 0; i < times; i++) {
            list.push({"code": 12});
        }

        list.push({"code": 0});
        this.forceMoveRoute({
            "list": list
        });
    };

    // 正面に移動可能か
    Game_Player.prototype.canPassFront = function() {
        return this.canPass(this.x, this.y, this.direction());
    };

    // 氷の床のリージョンID以外のタイルか、移動できなくなるまで前進
    Game_Player.prototype.moveStraightIceFloor = function() {
        var list = [];

        var x = this.x;
        var y = this.y;
        var d = this.direction();

        while (true) {
            if (!this.canPass(x, y, d)) {
                break;
            }

            switch(d) {
                case 2:
                    // 下
                    y = y + 1;
                    break;
                case 4:
                    // 左
                    x = x - 1;
                    break;
                case 6:
                    // 右
                    x = x + 1;
                    break;
                case 8:
                    // 上
                    y = y - 1;
                    break;
            }

            // 前進
            list.push({"code": 12});

            if ($gameMap.regionId(x, y) !== iceFloorRegionId) {
                break;
            }
        }

        list.push({"code": 0});
        this.forceMoveRoute({
            "list": list,
            "repeat": false,
            "skippable": true
        });
    };

})();