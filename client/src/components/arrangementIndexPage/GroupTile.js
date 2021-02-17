import React from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Tooltip} from '@material-ui/core'
import { withStyles} from '@material-ui/core/styles';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import GroupFormDialog from './GroupFormDialog'

const GroupTile = ({group, editable, groups, updateGroups, errors, clearErrors}) => {

  const LightTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#f3f3ee',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 15
    },
  }))(Tooltip);

  const style = {
    background: '#5c6361',
    color: '#f3f3ee',
    margin: '10px',
  }
  const green = '#a8d093'
  const yellow = '#e1c061'
  const red = '#cd685c'

  const students = group.students.map( student => {
    const toolTipMessage = 
      <>
        <Typography variant='body2'>Academic Tier: {student.academicTier}</Typography>
        <Typography variant='body2'>Social-Emotional Tier: {student.socialEmotionalTier}</Typography>
      </>

    let academicColor
    let socialColor

    if (student.academicTier == 1) {
      academicColor = {
        color: green,
      }
    } 
    if (student.socialEmotionalTier == 1) {
      socialColor = {
        color: green
      }
    }
    if (student.academicTier == 2) {
      academicColor = {
        color: yellow
      }
    }
    if (student.socialEmotionalTier == 2) {
      socialColor = {
        color: yellow
      }
    }
    if (student.academicTier == 3) {
      academicColor = {
        color: red
      }
    }
    if (student.socialEmotionalTier == 3) {
      socialColor = {
        color: red
      }
    }

    return (
      <LightTooltip
        key={student.id} 
        disableFocusListener
        disableTouchListener 
        title={toolTipMessage} 
        placement='right' 
        style={{
          fontSize: '40px'
        }}
        arrow>
      <ListItem >
        <ListItemIcon>
          <EmojiObjectsIcon style={academicColor}/>
          <PriorityHighIcon style={socialColor}/>
        </ListItemIcon>
        <ListItemText>
          {student.firstName} {student.lastInitial}
        </ListItemText>
      </ListItem>
      </LightTooltip>
    )
  })

  let groupForm
  if (editable) {
    groupForm = <GroupFormDialog
      thisGroup={group}
      groups={groups}
      updateGroups={updateGroups}
      errors={errors}
      clearErrors={clearErrors}
    />
  }
  return (
    <Card className="group-card" style={style} raised>
    {groupForm}
      <CardContent>
        <Typography variant="h4">{group.name}</Typography>
        <List>
        {students}
        </List>
      </CardContent>
    </Card>
  )
}

export default GroupTile
