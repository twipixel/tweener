/*
 * BetweenAS3
 *
 * Licensed under the MIT License
 *
 * Copyright (c) 2009 BeInteractive! (www.be-interactive.org) and
 *                    Spark project  (www.libspark.org)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


import AbstractTween from './AbstractTween';


 export default class TweenDecorator extends AbstractTween
 {
     /**
      *
      * @param baseTween {IITween}
      * @param position {number}
      */
     constructor(baseTween, position)
     {
         super(baseTween.ticker, position);

         /**
          *
          * @type {IITween}
          * @private
          */
         this._baseTween = baseTween;

         /**
          *
          * @type {number}
          * @private
          */
         this._duration = baseTween.duration;
     }

     /**
      * 
      * @returns {IITween}
      */
     get baseTween()
     {
         return this._baseTween;
     }

     play()
     {
         if (!this._isPlaying) {
             this._baseTween.firePlay();
             super.play();
         }
     }

     firePlay()
     {
         super.firePlay();
         this._baseTween.firePlay();
     }

     stop()
     {
         if (this._isPlaying === true) {
             super.stop();
             this._baseTween.fireStop();
         }
     }

     fireStop()
     {
         super.fireStop();
         this._baseTween.fireStop();
     }

     /**
      * 
      * @param time {number}
      */
     internalUpdate(time)
     {
         this._baseTween.update(time);
     }
 }