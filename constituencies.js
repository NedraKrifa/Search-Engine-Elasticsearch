let bulk = [];

const makebulk = (constituencylist) => {
  for (let current in constituencylist){
    bulk.push(
      { index: {_index: 'gov', _type: 'constituencies', _id: constituencylist[current].PANO } },
      {
        'constituencyname': constituencylist[current].ConstituencyName,
        'constituencyID': constituencylist[current].ConstituencyID,
        'constituencytype': constituencylist[current].ConstituencyType,
        'electorate': constituencylist[current].Electorate,
        'validvotes': constituencylist[current].ValidVotes,
        'regionID': constituencylist[current].RegionID,
        'county': constituencylist[current].County,
        'region': constituencylist[current].Region,
        'country': constituencylist[current].Country
      }
    );
  }
  return bulk;
}


module.exports = makebulk;

