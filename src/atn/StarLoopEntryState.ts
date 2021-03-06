/*!
 * Copyright 2016 Terence Parr, Sam Harwell, and Burt Harris
 * All rights reserved.
 * Licensed under the BSD-3-clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:37.7099201-07:00

import { ATNStateType } from './ATNStateType';
import { DecisionState } from './DecisionState';
import { Override } from '../Decorators';
import { StarLoopbackState } from './StarLoopbackState';

export class StarLoopEntryState extends DecisionState {
	loopBackState: StarLoopbackState;

	/**
	 * Indicates whether this state can benefit from a precedence DFA during SLL
	 * decision making.
	 *
	 * <p>This is a computed property that is calculated during ATN deserialization
	 * and stored for use in {@link ParserATNSimulator} and
	 * {@link ParserInterpreter}.</p>
	 *
	 * @see DFA#isPrecedenceDfa()
	 */
	precedenceRuleDecision: boolean = false;

	@Override
	getStateType(): ATNStateType {
		return ATNStateType.STAR_LOOP_ENTRY;
	}
}
