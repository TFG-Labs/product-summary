import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NumericStepper, withToast } from 'vtex.styleguide'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'
import { debounce } from 'lodash'
import { findIndex, propEq } from 'ramda'
import { injectIntl, intlShape } from 'react-intl'

import { productShape } from '../utils/propTypes'

class ProductQuantityStepper extends Component {
  static propTypes = {
    product: productShape.isRequired,
    onUpdateItemsState: PropTypes.func.isRequired,
    showToast: PropTypes.func,
    intl: intlShape,
  }

  state = {
    quantity: this.props.product.quantity,
    canIncrease: true,
  }

  handleOnChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.props.onUpdateItemsState(true)
    this.setState({ quantity: e.value }, () => this.debouncedUpdate(this.state.quantity))
  }

  checkUpdatedQuantity = (updateResponse, itemIndex, expectedQuantity) => {
    const { showToast, intl } = this.props
    const actualQuantity = updateResponse.items[itemIndex].quantity
    if (actualQuantity !== expectedQuantity) {
      this.setState({ canIncrease: false, quantity: actualQuantity })
      showToast({ message: intl.formatMessage({ id: 'editor.productSummary.quantity-error' }) })
    }
  }

  updateItemQuantity = async (quantity) => {
    const { product, orderFormContext } = this.props
    this.setState({ canIncrease: true })
    const itemIndex = findIndex(propEq('id', product.sku.itemId))(orderFormContext.orderForm.items)
    try {
      await orderFormContext.updateOrderForm({
        variables: {
          orderFormId: orderFormContext.orderForm.orderFormId,
          items: [{
            index: itemIndex,
            id: product.sku.itemId,
            quantity,
            seller: product.sku.sellerId,
          }],
        },
      })
      const orderForm = await orderFormContext.refetch()
      this.checkUpdatedQuantity(orderForm.data.orderForm, itemIndex, quantity)
    } catch (err) {
      // gone wrong, rollback to old quantity value
      const oldQuantity = orderFormContext.orderForm.items[itemIndex].quantity
      this.setState({ quantity: oldQuantity })
    }
    this.props.onUpdateItemsState(false)
  }

  debouncedUpdate = debounce(this.updateItemQuantity, 1000)

  render() {
    return (
      <NumericStepper
        lean
        size="small"
        value={this.state.quantity}
        minValue={1}
        maxValue={this.state.canIncrease ? undefined : this.state.quantity}
        onChange={this.handleOnChange}
      />
    )
  }
}

export default injectIntl(withToast(orderFormConsumer(ProductQuantityStepper)))
