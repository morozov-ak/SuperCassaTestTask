import React from 'react'
import { connect } from 'react-redux'

const PhonesList = ({ phones }) => {

    return (
        <ul class="list-group myList">
            {phones.map(
                item => {
                    return(<li className="list-group-item" key={item._id} >+{item.phone}</li>)
                }
            )}
        </ul>
    )
}

const mapStateToProps = state => {
    return { phones: state.app.phones }
}

export default connect(mapStateToProps, null)(PhonesList)
