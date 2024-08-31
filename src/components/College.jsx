import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const  findSupersc= (val) =>{
    if(val===1) return "st"
    if(val===2) return "nd"
    if(val===3) return "rd"
    return "th"


  }

  const fetchInitialData = async () => {
    const response = await axios.get("/colleges.json");
    setColleges(response.data.slice(0, 10));
  };

  const fetchMoreData = async () => {
    const response = await axios.get("/colleges.json");
    const newColleges = response.data.slice(
      colleges.length,
      colleges.length + 10
    );
    if (newColleges.length === 0) {
      setHasMore(false);
    } else {
      setColleges([...colleges, ...newColleges]);
    }
  };

  const sortColleges = (key) => {
    setSortKey(key);

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    const sortedColleges = [...colleges].sort((a, b) => {
      let aValue, bValue;

      // Handle nested fields like user_reviews.rating
      if (key === "user_reviews.rating") {
        aValue = a.user_reviews.rating;
        bValue = b.user_reviews.rating;
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setColleges(sortedColleges);
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by college name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <InfiniteScroll
        dataLength={colleges.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <table>
          <thead>
            <tr style={{ backgroundColor: "#57C2C1", color: "white" }}>
              <th>Rank</th>
              <th>College</th>
              <th onClick={() => sortColleges("fees")}>Course Fees</th>
              <th>Placement</th>
              <th onClick={() => sortColleges("user_reviews.rating")}>
                User Reviews
              </th>
              <th>Ranking</th>
            </tr>
          </thead>

          <tbody>
            {filteredColleges.map((college, index) => (
              <tr key={index} className={college.featured ? "featured" : ""}>
                <td>#{index + 1}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <div style={{ padding: "5px" }}>
                      <img
                        src="IIT.png"
                        style={{ width: "35px", padding: "10px" }}
                      />
                    </div>
                    <div>
                      <span style={{ color: "#0099E6" }}>{college.name}</span>
                      <br />
                      <small>{college.location}</small>
                      <div
                        style={{
                          padding: "10px",
                          fontSize: "small",
                          backgroundColor: "lightgoldenrodyellow",
                          width: "fit-content",
                        }}
                      >
                        <div style={{ color: "orange", fontWeight: "bold" }}>
                          {college.course}
                        </div>
                        <div>{`JEE-Advanced 2023 Cutoff: ${college.cutoff}`}</div>
                      </div>
                      {college.featured && (
                        <small className="highlight">Featured</small>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "small",
                      paddingTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        color: "orange",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <ArrowForwardIcon />
                      </div>
                      <div>Apply Now</div>
                    </div>
                    <div style={{ color: "#40bf80", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                      <div style={{}}>
                        <DownloadIcon />
                      </div>
                      <div>Download Brochure</div>
                    </div>
                    <div style={{ fontWeight: "bold" }}>
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />
                      Add to compare
                    </div>
                  </div>
                </td>
                <td style={{lineHeight: "30px"}}>
                  <div style={{color: "#40bf80", fontWeight: "bold"}}>₹ {college.fees.toLocaleString()}</div>
                  <div>B.E/B.Tech</div>
                  <div>-1st Year Fees</div>
                  <div style={{display: "flex", alignItems: "center", color: "orange"}}>
                    <CompareArrowsIcon />
                    Compare Fees
                  </div>
                </td>
                <td style={{lineHeight: "23px"}}>
                  <span style={{color: "#40bf80", }}>₹ {college.placement.average.toLocaleString()}</span>
                  <br />
                  <span>Average Package</span>
                  <br />
                  <span style={{color: "#40bf80"}}>₹ {college.placement.highest.toLocaleString()}</span>
                  <br />
                  <span>Highest Package</span>
                  <br />
                  <div style={{color: "orange", display: "flex", alignItems:"center"}}>
                    <CompareArrowsIcon />
                    Compare Placement
                  </div>
                </td>
                <td style={{lineHeight: "30px"}}>
                  <span>{college.user_reviews.rating}/10</span>
                  <br />
                  <small>Based on 100 college reviews</small>
                  <br />
                  <div 
                    style = {{
                      display: "flex",
                      alignItems: "center",
                      fontSize:"15px",
                      backgroundColor: "lightyellow",
                      borderRadius: "15px",
                      color: "maroon"


                    }}
                  
                  
                  >
                    <DoneIcon/>
                    <small>{college.user_reviews.highlight}</small>
                    <KeyboardArrowDownIcon/>

                  </div>
                  
                </td>
                <td style={{lineHeight: "40px"}}>
                  <span>{college.ranking}</span>
                  <br />
                  <div>India Today 2023</div>
                  <div
                   
                  
                  >
                    <select id="cars" name="carlist" form="carform"
                      style= {{
                        backgroundColor: "lightBlue",
                        border: "none",
                        color: "blue",
                        padding: "5px",
                        borderLeft:"1px solid blue",
                        borderBottomRightRadius:"30%",
                        borderTopRightRadius:"30%"
  
  
                      }}
                    >
                      <option value="volvo">+10 More</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CollegeList;
