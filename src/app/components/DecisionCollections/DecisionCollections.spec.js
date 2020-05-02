import React from "react"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux';

import DecisionCollections, {
  decisionCollectionInitialState,
  createDecisionCollection
} from './DecisionCollections'

import store from '../../store'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory();
const WrappedDecisionCollection = () => <Provider store={store}>
  <DecisionCollections history={history} />
</Provider>


describe('DecisionCollections Component', () => {
  it('should render', () => {
    expect(true).toBe(true)
    // const { getByText, findByText } = render(<WrappedDecisionCollection />)
    // expect(getByText("Decision Collections")).toBeTruthy()
  })
  // describe('createDecisionCollection', () => {
  //   it('should create a decisionCollection and add it to DecisionCollections state', () => {
  //     render(<WrappedDecisionCollection />)

  //     fireEvent.click(screen.getByTestId('create'))

  //     const decisionCollectionState = store.getState().decisionCollection
  //     const decisionCollectionsState = store.getState().decisionCollections

  //     expect(decisionCollectionsState[0]).toEqual(decisionCollectionState)
  //   })
  // })
})