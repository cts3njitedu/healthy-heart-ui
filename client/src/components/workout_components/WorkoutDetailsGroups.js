import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { isEmpty } from 'lodash'
import WorkoutDetailsGroup from './WorkoutDetailsGroup';
import { SECTION, PAGE } from '../../constants/page_constants';
import { handleChangeGroup, handleBlurGroup, addOREditWorkoutGroupStart} from '../../actions/workoutAction'

class WorkoutDetailsGroups extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleChange(event) {
        console.log("Handle Change:", event.target)
        let field = {
            name: event.target.name,
            value: event.target.value
        }
        this.props.handleChangeGroup(field);
    }

    handleBlur(event) {
        console.log("Handle Change:", event.target);
        let field = {
            name: event.target.name,
            value: event.target.value
        }
        this.props.handleBlurGroup(field);
    }
    handleEdit(event, group) {
        console.log("Handle Edit:", event.target, group);
        this.props.addOREditWorkoutGroupStart(true, group)
    }
    render() {
        const { error, loading, selectedWorkout,isAddGroup, editGroup, sections, hasGroupFormErrors } = this.props;
        if (loading) {
            return (
                <div>
                    <Loading />
                </div>

            )
        }
        else if (error) {
            return (
                <div>Error getting page...</div>
            )
        } else {
            console.log("Workout Groups:", selectedWorkout, sections)
            if (selectedWorkout) {
                let groupSections = selectedWorkout.groupSections;
                if (!isEmpty(groupSections) && Array.isArray(groupSections)) {
                    console.log("Workout Groups:", groupSections, editGroup)
                        if (!isAddGroup) {
                            return (
                                <div className="workoutDetailsGroups">
                                    {groupSections.map((group, index) => {
                                        console.log("Group:", group);
                                        return <WorkoutDetailsGroup key={group.metaDataId} groupSection={group} handleEdit={this.handleEdit}/>
                                    })}
                                </div>
                            )
                        } else {
                            if (editGroup) {
                                return (
                                    <div className="workoutGroupForm">
                                        {hasGroupFormErrors&& <div style={{fontSize: "xx-large", color: "red"}}>Form Has Errors Can't Save</div>}
                                        <WorkoutDetailsGroup groupSection={editGroup} handleChange={this.handleChange} handleBlur={this.handleBlur}/>
                                    </div>
                                )
                            }
                            
                        }
                        
                
                 

                }
                // if (groupSections) {
                //     groupSections.map((groupSection) => {
                //         console.log("Group:", groupSection)
                //     })
                // }
            }

            return (
                <div>Progressing...</div>
            )

        }
    }
}


function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workoutDetails.sections,
        newSections: state.workoutDetails.newSections,
        loading: state.workoutDetails.isWorkoutDetailsLoading,
        error: state.workoutDetails.isWorkoutDetailsError,
        selectedWorkout: state.workoutDetails.selectedWorkout,
        confirmationData: state.workoutDetails.confirmationData,
        isAddGroup: state.workoutDetails.isAddGroup,
        isEditGroup: state.workoutDetails.isEditGroup,
        editGroup: state.workoutDetails.editGroup,
        hasGroupFormErrors: state.workoutDetails.isValidationErrors
    }

}

const mapDispatchToProps = {
    handleChangeGroup,
    handleBlurGroup,
    addOREditWorkoutGroupStart
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDetailsGroups));