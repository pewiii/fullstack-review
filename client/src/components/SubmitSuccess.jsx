import React from 'react';

const SubmitSuccess = ({counts}) => {
  console.log('added: ', counts.added);
  return <span>added: {counts.added}, &nbsp;&nbsp;&nbsp;&nbsp; duplicates: {counts.dupes}, &nbsp;&nbsp;&nbsp;&nbsp; updated: {counts.updated}</span>;
}


export default SubmitSuccess;