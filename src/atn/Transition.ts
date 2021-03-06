/*!
 * Copyright 2016 Terence Parr, Sam Harwell, and Burt Harris
 * All rights reserved.
 * Licensed under the BSD-3-clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:37.8530496-07:00

import { ATNState } from './ATNState';
import { IntervalSet } from '../misc/IntervalSet';
import { NotNull } from '../Decorators';
import { TransitionType } from './TransitionType';

/** An ATN transition between any two ATN states.  Subclasses define
 *  atom, set, epsilon, action, predicate, rule transitions.
 *
 *  <p>This is a one way link.  It emanates from a state (usually via a list of
 *  transitions) and has a target state.</p>
 *
 *  <p>Since we never have to change the ATN transitions once we construct it,
 *  we can fix these transitions as specific classes. The DFA transitions
 *  on the other hand need to update the labels as it adds transitions to
 *  the states. We'll use the term Edge for the DFA to distinguish them from
 *  ATN transitions.</p>
 */
export abstract class Transition {
	static readonly serializationNames: string[] = [
		"INVALID",
		"EPSILON",
		"RANGE",
		"RULE",
		"PREDICATE",
		"ATOM",
		"ACTION",
		"SET",
		"NOT_SET",
		"WILDCARD",
		"PRECEDENCE"
	];

	// @SuppressWarnings("serial")
	// static serializationTypes: Map<Class<? extends Transition>, number> =
	// 	Collections.unmodifiableMap(new HashMap<Class<? extends Transition>, Integer>() {{
	// 		put(EpsilonTransition.class, EPSILON);
	// 		put(RangeTransition.class, RANGE);
	// 		put(RuleTransition.class, RULE);
	// 		put(PredicateTransition.class, PREDICATE);
	// 		put(AtomTransition.class, ATOM);
	// 		put(ActionTransition.class, ACTION);
	// 		put(SetTransition.class, SET);
	// 		put(NotSetTransition.class, NOT_SET);
	// 		put(WildcardTransition.class, WILDCARD);
	// 		put(PrecedencePredicateTransition.class, PRECEDENCE);
	// 	}});

	/** The target of this transition. */
	@NotNull
	target: ATNState;

	constructor(@NotNull target: ATNState) {
		if (target == null) {
			throw "target cannot be null.";
		}

		this.target = target;
	}

	abstract getSerializationType(): TransitionType;

	/**
	 * Determines if the transition is an "epsilon" transition.
	 *
	 * <p>The default implementation returns {@code false}.</p>
	 *
	 * @return {@code true} if traversing this transition in the ATN does not
	 * consume an input symbol; otherwise, {@code false} if traversing this
	 * transition consumes (matches) an input symbol.
	 */
	isEpsilon(): boolean {
		return false;
	}

	label(): IntervalSet | undefined {
		return undefined;
	}

	abstract matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
