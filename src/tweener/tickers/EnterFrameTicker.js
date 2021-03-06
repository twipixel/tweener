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


import Ticker from './../core/ticker/Ticker';
import TickerListener from '../core/ticker/TickerListener.js';


const _ticker = new Ticker();


export default class EnterFrameTicker
{
    constructor()
    {
        /**
         * @type {TickerListener}
         * @private
         */
        this._first = null;

        /**
         * @type {uint}
         * @private
         */
        this._numListeners = 0;

        /**
         * AS3에서는 {Vector.<TickerListener>}
         * 10개만 생성합니다. new Vector.<TickerListener>(10, true)
         * @type {Array}
         * @private
         */
        this._tickerListenerPaddings = [];

        /**
         * @type {number}
         */
        this._time = undefined;

        var prevListener = null;

        for (var i = 0; i < 10; ++i) {
            var listener = new TickerListener();
            if (prevListener != null) {
                prevListener.nextListener = listener;
                listener.prevListener = prevListener;
            }
            prevListener = listener;
            this._tickerListenerPaddings[i] = listener;
        }

        _ticker.add(this.update, this);
    }

    /**
     * @return {number}
     */
    get time()
    {
        return this._time;
    }

    /**
     * @param listener {TickerListener}
     */
    addTickerListener(listener)
    {
        if (listener.nextListener != null || listener.prevListener != null) {
            return;
        }

        if (this._first != null) {
            if (this._first.prevListener != null) {
                this._first.prevListener.nextListener = listener;
                listener.prevListener = this._first.prevListener;
            }
            listener.nextListener = this._first;
            this._first.prevListener = listener;
        }

        this._first = listener;

        ++this._numListeners;
    }

    /**
     *
     * @param listener {TickerListener}
     */
    removeTickerListener(listener)
    {
        var l = this._first;

        while (l != null) {

            if (l == listener) {
                if (l.prevListener != null) {
                    l.prevListener.nextListener = l.nextListener;
                    l.nextListener = null;
                }
                else {
                    this._first = l.nextListener;
                }
                if (l.nextListener != null) {
                    l.nextListener.prevListener = l.prevListener;
                    l.prevListener = null;
                }
                --this._numListeners;
            }

            l = l.nextListener;
        }
    }

    /**
     * @inheritDoc
     */
    start()
    {
        this._time = getTimer() / 1000;
        _ticker.start();
    }

    /**
     * @inheritDoc
     */
    stop()
    {
        _ticker.stop();
    }

    /**
     * @private
     */
    update(currentTime)
    {
        var t = this._time = getTimer() / 1000, n = 8 - (this._numListeners % 8), listener = this._tickerListenerPaddings[0], l = this._tickerListenerPaddings[n], ll = null;

        if ((l.nextListener = this._first) != null) {
            this._first.prevListener = l;
        }

        while (listener.nextListener != null) {
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
            if ((listener = listener.nextListener).tick(t)) {
                if (listener.prevListener != null) {
                    listener.prevListener.nextListener = listener.nextListener;
                }
                if (listener.nextListener != null) {
                    listener.nextListener.prevListener = listener.prevListener;
                }
                ll = listener.prevListener;
                listener.nextListener = null;
                listener.prevListener = null;
                listener = ll;
                --this._numListeners;
            }
        }

        if ((this._first = l.nextListener) != null) {
            this._first.prevListener = null;
        }
        l.nextListener = this._tickerListenerPaddings[n + 1];
    }
}