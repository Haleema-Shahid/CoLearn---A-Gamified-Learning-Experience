//these cards display content of a selected topic like assignment and material
import * as React from 'react';
import { stopPropagation } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import MaterialCard from './MaterialCard'
import AssignmentCard from './AssignmentCard'
//receives : key={material.id} contentType="material" userId={userId} classId={classId} topicId={topicId} materialId={material._id}


function ContentCard(props) {
  console.log("in content card")
  console.log("content type is : ", props.contentType)

    const [contentType, setContentType]=useState(props.contentType)
    if (contentType === "materialContent") {
        return <MaterialCard  contentType={contentType} userId={props.userId} classId={props.classId} weekId={props.weekId} topicId={props.topicId} materialId={props.materialId} material={props.materialContent}/>;
      } else if (contentType === "assignmentContent") {
        return <AssignmentCard contentType={contentType} userId={props.userId} classId={props.classId} weekId={props.weekId} topicId={props.topicId} materialId={props.materialId} material={props.materialContent}/>;
      } else {
        return null;
      }
}

export default ContentCard