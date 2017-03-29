﻿/*
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

import IEasing from './IEasing';


export default class BackEaseInOut extends IEasing
{
    /**
     *
     * @param s {number} Specifies the amount of overshoot, where the higher the value, the greater the overshoot.
     */
	constructor(s = 1.70158)
	{
		super();
		this.s = s;
	}

    /**
     * @inheritDoc
     */
	calculate(t, b, c, d)
	{
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((this.s * 1.525) + 1) * t - this.s * 1.525)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((this.s * 1.525) + 1) * t + this.s * 1.525) + 2) + b;
	}
}