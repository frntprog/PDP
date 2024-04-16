const Text = (props) => {
  console.log("props", props);
  const updateTimelineData = (newData) => {
    console.log(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  return <textarea onClick={updateTimelineData}></textarea>;
};

export default Text;
