import { AsyncThunk, createReducer, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// State for the reducer
export interface PendingRequestState {
  pending: string[];
}
const initialState: PendingRequestState = {
  pending: [],
};

// The reducer itself, only listens to add and remove actions
const reducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(isPending, (state, action) => {
      const name = action.type.slice(0, -8);
      state.pending = [...state.pending, name];
    })
    .addMatcher(isFulfilled, (state, action) => {
      const name = action.type.slice(0, -10);
      const copy = [...state.pending];
      copy.splice(copy.indexOf(name), 1);
      state.pending = copy;

      // console.log('Pending Requests:', state.pending);
    })
    .addMatcher(isRejected, (state, action) => {
      const name = action.type.slice(0, -9);
      const copy = [...state.pending];
      copy.splice(copy.indexOf(name), 1);
      state.pending = copy;

      // console.log('Pending Requests:', state.pending);
    });
});

type StateLoader<RootState> = (state: RootState) => PendingRequestState;

/**
 * Selector that allows listeners for specific pending items to render when the list changes.
 * Outer function: A wrapper that allows the selector to work regardless of state type
 * @typeParam RootState the application root state type
 * @param getState a function that takes in the state and returns the
 * PendingRequestState portion
 * @returns a function that creates selectors for specific events
 *
 * Inner function: Creates a selector listening for a specific event
 * @param names a list of names of the events to check for
 * @returns An array containing a true/false value for each entry in the names array.
 */
const hasPendingRequest =
  <RootState>(getState: StateLoader<RootState>) =>
    (...actions: AsyncThunk<any, any, any>[]) =>
      actions.map((a) =>
        useSelector<RootState, boolean>((state) => getState(state).pending.includes(a.typePrefix)),
      );

export default reducer;
export { hasPendingRequest };
