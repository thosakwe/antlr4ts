/*!
 * Copyright 2016 Terence Parr, Sam Harwell, and Burt Harris
 * All rights reserved.
 * Licensed under the BSD-3-clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:35.0257730-07:00

import { ATNStateType } from './ATNStateType';
import { DecisionState } from './DecisionState';
import { Override } from '../Decorators';

/** Decision state for {@code A+} and {@code (A|B)+}.  It has two transitions:
 *  one to the loop back to start of the block and one to exit.
 */
export class PlusLoopbackState extends DecisionState {

	@Override
	getStateType(): ATNStateType {
		return ATNStateType.PLUS_LOOP_BACK;
	}
}
