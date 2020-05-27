import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { confirmationAction } from '../../actions/workoutAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {isEmpty} from 'lodash'
class ConfirmationModal extends Component {
    constructor(props) {
        super(props);
        this.handleConfirmationYes = this.handleConfirmationYes.bind(this);
        this.handleConfirmationNo = this.handleConfirmationNo.bind(this);
    }

    handleConfirmationYes() {
        let confirmationData = this.props.confirmationData;
        let yesAction = confirmationData.confirmYes;
        console.log("Handle Yes:", confirmationData)
        this.props.confirmationAction(yesAction, confirmationData.data)
    }

    handleConfirmationNo() {
        let confirmationData = this.props.confirmationData;
        let noAction = confirmationData.confirmNo;
        this.props.confirmationAction(noAction, confirmationData.data)
    }
    render() {
        let confirmationData = this.props.confirmationData;
        if (!isEmpty(confirmationData)) {
            console.log("Confirmation Modal Message", confirmationData.confirmMessage)
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            {confirmationData.confirmMessage && <Modal.Title>{confirmationData.confirmMessage}</Modal.Title>}
                            {!confirmationData.confirmMessage &&<Modal.Title>Confirmation Data Will Be Lost Without Saving</Modal.Title>}
                        </Modal.Header>
                        <Modal.Body>Do you wish to continue?</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleConfirmationYes}>Yes</Button>
                            <Button bsStyle="primary" onClick={this.handleConfirmationNo}>No</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        } else {
            return null;
        }
        
    }
    
}

function mapStateToProps(state) {
    return {
        confirmationData: state.workoutDetails.confirmationData
    }

}

const mapDispatchToProps = {
    confirmationAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal));