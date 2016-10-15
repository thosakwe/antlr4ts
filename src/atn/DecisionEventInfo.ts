﻿/*
 * [The "BSD license"]
 *  Copyright (c) 2014 Terence Parr
 *  Copyright (c) 2014 Sam Harwell
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *  1. Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *  3. The name of the author may not be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 *  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 *  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// ConvertTo-TS run at 2016-10-04T11:26:28.2401032-07:00

import { NotNull } from '../Decorators';
import { SimulatorState } from './Stub_SimulatorState';
import { TokenStream } from '../TokenStream';

/**
 * This is the base class for gathering detailed information about prediction
 * events which occur during parsing.
 *
 * Note that we could record the parser call stack at the time this event
 * occurred but in the presence of left recursive rules, the stack is kind of
 * meaningless. It's better to look at the individual configurations for their
 * individual stacks. Of course that is a {@link PredictionContext} object
 * not a parse tree node and so it does not have information about the extent
 * (start...stop) of the various subtrees. Examining the stack tops of all
 * configurations provide the return states for the rule invocations.
 * From there you can get the enclosing rule.
 *
 * @since 4.3
 */
export class DecisionEventInfo {
	/**
	 * The invoked decision number which this event is related to.
	 *
	 * @see ATN#decisionToState
	 */
	decision: number;

	/**
	 * The simulator state containing additional information relevant to the
	 * prediction state when the current event occurred, or {@code null} if no
	 * additional information is relevant or available.
	 */
	state: SimulatorState | undefined;

	/**
	 * The input token stream which is being parsed.
	 */
	@NotNull
	input: TokenStream;

	/**
	 * The token index in the input stream at which the current prediction was
	 * originally invoked.
	 */
	startIndex: number;

	/**
	 * The token index in the input stream at which the current event occurred.
	 */
	stopIndex: number;

	/**
	 * {@code true} if the current event occurred during LL prediction;
	 * otherwise, {@code false} if the input occurred during SLL prediction.
	 */
	fullCtx: boolean;

	constructor(
		decision: number,
		state: SimulatorState | undefined,
		@NotNull input: TokenStream,
		startIndex: number,
		stopIndex: number,
		fullCtx: boolean) {

		this.decision = decision;
		this.fullCtx = fullCtx;
		this.stopIndex = stopIndex;
		this.input = input;
		this.startIndex = startIndex;
		this.state = state;
	}
}
