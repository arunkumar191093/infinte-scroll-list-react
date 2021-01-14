import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '../../api/Api';
import CardItem from '../CardItem/CardItem';
import './productsList.css';


const ProductsList = () => {
  const [productItems, setProductItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const loadingElemRef = useRef(null);
  let prevY = 0;
  let len = 0;
  let searchTextVal = "";
  let isFiltering = false;

  useEffect(() => {
    fetchAllProducts();
    let observer = new IntersectionObserver(
      ([entry]) => handleObserver(entry, len, searchTextVal),
      options
    );
    observer.observe(loadingElemRef.current);

  }, [])


  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.9
  };

  const fetchAllProducts = async (pageNum, text) => {
    let response = await getAllProducts(pageNum ? pageNum : currentPage, text ? text : searchText);
    if (response.length) {
      len += response.length;
      setProductItems(oldItems => text ? [...response] : [...oldItems, ...response]);
      setFilteredItem(oldItems => text ? [...response] : [...oldItems, ...response]);
    }
  }


  const handleSearch = (text) => {
    isFiltering = true;
    setSearchText(text);
    searchTextVal = text;
    console.log('in search')
    if (text) {
      let filtered = productItems.filter((item) => {
        return item.title.toLowerCase().indexOf(searchTextVal.toLowerCase()) > -1;
      })
      setFilteredItem([...filtered]);
    }
    else {
      setFilteredItem([...productItems])
    }
  }

  const getSizeVariations = (sizes) => {
    return sizes.map((item) => item.title).join(',')
  }

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  }

  const handleObserver = (entry, lastPage, searchTextVal) => {
    if (!isFiltering) {
      const y = entry.boundingClientRect.y;
      if (prevY > y) {
        setCurrentPage(lastPage);
        console.log('in scroll observer')
        fetchAllProducts(lastPage, searchTextVal)
      }
      prevY = y;
    }
  }


  return (
    <div>
      <div className="search-container">
        <input placeholder="Search by title" value={searchText} onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <div className="product-list-container">
        {
          filteredItem.map((item) => (
            <CardItem key={`album_detail_${item.id}`} cardData={item}
              imageUrl={item.imageUrl} title={item.title} description={item.subTitle} sizes={getSizeVariations(item.sizeVariation)}>
            </CardItem>
          ))
        }
        {
          !filteredItem.length &&
          <div className="no-records">
            No Records Found!
          </div>
        }
      </div>
      <div ref={loadingElemRef} className="loading"></div>
      <button type="button" className="scroll-top-btn" onClick={handleScrollTop}>⬆</button>
    </div>
  )
}

export default ProductsList;