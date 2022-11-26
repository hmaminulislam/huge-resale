import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import SellerItem from '../AllSellers/SellerItem';

const AllBuyers = () => {
    const [buyers, setBuyers] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
      fetch(`http://localhost:5000/buyers`)
        .then((res) => res.json())
        .then((data) => setBuyers(data));
    }, []);
    return (
      <div>
        <h2 className="text-3xl font-semibold mb-5 mt-10">All Buyers</h2>
        {buyers ? (
          <div className="mr-20">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {buyers?.map((currentUser, index) => (
                    <SellerItem
                      key={currentUser._id}
                      currentUser={currentUser}
                      index={index}
                    ></SellerItem>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h3 className="text-2xl font-semibold text-primary">No Book</h3>
        )}
      </div>
    );
};

export default AllBuyers;