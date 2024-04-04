const SuggestionsAndReport = require("./suggestionsAndReport.model");

module.exports.addSuggestionAndReportServices = async data => {
  // Check if the user already has a store
  // const existingStore = await Blogs.findOne({ email: email });

  // if (existingStore) {
  //     return { error: 'One user can add one comment' };
  // }

  const result = await SuggestionsAndReport.create(data);
  // console.log(result, "resulttttt comment")
  return result;
};

module.exports.getSuggestionAndReportServices = async () => {
  
  const result = await SuggestionsAndReport.find({}).populate({
    path: 'userId',
    select: 'email gender mobile', 
  })

  return result;
};

module.exports.getSuggestionAndReportByIdServices = async (id) => {
  // console.log(id, 'commentId');
  const result = await SuggestionsAndReport.findOne({ _id: id });

  return result;
};

module.exports.deleteSuggestionAndReportServices = async (id) => {
  const result = await SuggestionsAndReport.deleteOne({ _id: id });
  return result;
};
