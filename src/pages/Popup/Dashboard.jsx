import { Magic } from 'magic-sdk';
// import secrets from '../../secrets/secrets.development';
export const magic = new Magic('pk_live_C978F3A837C4396C');
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Loading from './Loading';
import logo from '../../assets/img/dframe.png';
import { BsThreeDots } from 'react-icons/bs';
import { IoChevronForwardOutline } from 'react-icons/io5';
import wallet from '../../assets/img/account_balance_wallet.png';
import info from '../../assets/img/info.png';
import reward from '../../assets/img/payments.png';
import barChart from '../../assets/img/bar_chart.png';
import analytics from '../../assets/img/query_stats.png';
import permission from '../../assets/img/how_to_reg.png';
import { IoPersonSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';

export default function Dashboard() {
  const [userAddress, setUserAddress] = useState(null);
  const [adId, setAdId] = useState(null);
  const [adData, setAdData] = useState(null);
  const history = useNavigate();
  const [nav, setNav] = useState(false);
  const stateChanger = () => {
    setNav(!nav);
  };
  const [on, setOn] = useState(null);
  const statesChanger = async () => {
    setOn(false);
    setTimeout(async () => {
      await axios
        .patch(
          `https://user-backend-402016.el.r.appspot.com/user/api/permissions/${userAddress}`,
          {
            browserData: false,
            storageOption: 'GCP',
          }
        )
        .then((response) => {
          console.log('SUCCESFUL STATE CHANGE');
          getPermissions();
        })
        .catch((err) => console.log('ERROR STATE CHANGER', err));
    }, 1000);
  };

  async function statesChanger2() {
    setOn(true);

    await axios
      .patch(
        `https://user-backend-402016.el.r.appspot.com/user/api/permissions/${userAddress}`,
        {
          browserData: true,
          storageOption: 'GCP',
        }
      )
      .then((response) => {
        console.log('SUCCESFUL STATE CHANGE');
        getPermissions();
      })
      .catch((err) => console.log('ERROR STATE CHANGER', err));
  }
  const [state, setState] = React.useState({ status: true });

  // Change State Function
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [walletBalance, setWalletBalance] = useState(null);
  const [fetch, setFetch] = useState(false);

  async function getBalance() {
    const web3 = new Web3(
      'https://polygon-mainnet.g.alchemy.com/v2/_xMDDbGjWeTKK9fP6u08arZZ9RU5M9BB'
    );
    // set the contract address of the DFT token
    const dframeAddress = '0x0B6163c61D095b023EC3b52Cc77a9099f6231FCC';

    // set the ABI for the DFT token contract
    const dframeABI = [
      { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'Snapshot',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint256', name: 'snapshotId', type: 'uint256' },
        ],
        name: 'balanceOfAt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'burnFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
        ],
        name: 'increaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'snapshot',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'snapshotId', type: 'uint256' },
        ],
        name: 'totalSupplyAt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];

    // get the DFT token contract instance
    const dframeContract = new web3.eth.Contract(dframeABI, dframeAddress);
    //  get the balance of DFRAME tokens for the specified wallet address
    const balance = await dframeContract.methods
      .balanceOf(userAddress)
      // .balanceOf('0x659664dd23937edee4f19391A5C355FdbD4c93e6')
      .call();
    setFetch(true);
    const balanceInEth = web3.utils.fromWei(balance, 'ether');
    const balanceInKFormat = Math.trunc(balanceInEth / 1000).toString() + 'k';
    setWalletBalance(balanceInKFormat);
    console.log(walletBalance);
    console.log('userBalance', userBalance);
  }

  async function fetchAd() {
    await axios
      .get(
        `https://user-backend-402016.el.r.appspot.com/ad/api/get-particular-ad/${adId}`
      )
      .then((response) => {
        console.log('Fetched succesfully', response.data);
        setAdData(response.data);
      })
      .catch((error) => {
        console.log('error in fetching ad', error);
      });
  }

  // async function getLatestAdId() {
  //   await axios
  //     .get(
  //       `https://user-backend-402016.el.r.appspot.com/user/api/user/get-latest-ad/${userAddress}`
  //     )
  //     .then((response) => {
  //       console.log('Fetched ADID', response.data);
  //       setAdId(response.data.latestAdId);
  //     })
  //     .catch((error) => {
  //       console.log('Error AdID', error);
  //     });
  // }
  async function getLatestAdId() {
    await axios
      .get(
        `https://user-backend-402016.el.r.appspot.com/user/api/user/get-latest-ad/${userAddress}`
      )
      .then((response) => {
        console.log('Fetched ADID', response.data);
        const latestAdId = response.data.latestAdId;

        // Check if the latestAdId is not null
        if (latestAdId !== null) {
          // Store the latestAdId in local storage
          console.log('LATEST AD ID NOT NULL');
          chrome.storage.local.set({ latestAdId: latestAdId }, function () {
            console.log('latestAdId stored in local storage:', latestAdId);
          });
        }

        // Set the adId state
        setAdId(latestAdId);
      })
      .catch((error) => {
        console.log('Error AdID', error);
      });
  }

  async function seenAdFunction() {
    console.log('SEEN AD FUNCTION', adId);
    // window.open(adData.adUrl ? adData.adUrl : 'https://dframe.org', '_blank');
    await axios
      .post(
        `https://user-backend-402016.el.r.appspot.com/user/api/update-ad-status/${userAddress}/${adId}`
      )
      .then((response) => {
        chrome.storage.local.remove('latestAdId', function () {
          console.log('latestAdId removed from local storage');
        });
        console.log('Seen Successfully', response.data);
      })
      .then(() => {
        getLatestAdId();
      })
      .catch((error) => {
        console.log('Error in seenAdFunction', error);
      });
  }

  async function getPermissions() {
    await axios
      .get(
        `https://user-backend-402016.el.r.appspot.com/user/api/user/${userAddress}`
      )
      .then(async (res) => {
        console.log('Got Permissions', res.data);
        setOn(res.data.user.permissions.browserData);
        chrome.storage.sync.set(
          { toggle: res.data.user.permissions.browserData },
          () => {
            console.log(
              'Toggle stored in dashboard',
              res.data.user.permissions.browserData
            );
          }
        );
      })
      .catch((err) => console.log('Error in getPermissions', err));
  }

  useEffect(() => {
    fetchAd();
  }, [adId]);

  useEffect(() => {
    getBalance();
    getLatestAdId();
    getPermissions();
  }, [userAddress]);
  useEffect(() => {
    // Get the userAddress from chrome.storage.sync
    chrome.storage.sync.get(['userPublicAddress'], (result) => {
      if (result.userPublicAddress) {
        setUserAddress(result.userPublicAddress);
      } else {
        history('/login');
      }
    });
  }, []);

  return (
    <div className="mcontainer">
      <div className="flexbox">
        <a
          href="https://dframe.org/"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          target="_blank"
        >
          <div className="lflex">
            <img src={logo} width="65" alt="logo" />
            <h2 className="text" style={{ width: '80px' }}>
              D Frame
            </h2>
          </div>
        </a>

        <div
          style={{ padding: '8px' }}
          className="on"
          onClick={on ? statesChanger : statesChanger2}
        >
          {on ? <p>OFF</p> : <p>ON</p>}
        </div>

        <div
          onClick={on ? statesChanger : statesChanger2}
          style={{
            margin: 'auto',
            display: 'block',
            width: 'fit-content',
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={on ? true : false}
                onChange={handleChange}
                color="primary"
                name="status"
              />
            }
          />
        </div>

        <div className="dots" onClick={stateChanger}>
          <BsThreeDots size={30} />
        </div>
      </div>
      {!adData && (
        <iframe
          width="95%"
          height="310"
          src="https://www.youtube.com/embed/YKaj1HUcYt0?controls=1"
          title="YouTube video player"
          // frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {adData && adData.adType && (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {adData.adType == 'image' ? (
            <img
              src={
                adData.image
                  ? adData.image
                  : 'https://upload.wikimedia.org/wikipedia/commons/a/a0/ROR_RAJE.jpg'
              }
              width={100}
            />
          ) : (
            <video
              width={288} // Adjust the width as needed
              height={202} // Adjust the height as needed
              controls // Add controls for play, pause, etc.
            >
              <source
                src={
                  adData.image
                    ? adData.image
                    : 'https://www.youtube.com/embed/YKaj1HUcYt0?controls=1'
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
          <a
            href={adData.adUrl ? adData.adUrl : 'https://dframe.org'}
            target="_blank"
            rel="noreferrer"
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              height: '10px',
            }}
            onClick={seenAdFunction}
          >
            <h2
              style={{
                fontSize: '20px',
                color: 'blue',
              }}
            >
              {adData.adName}
            </h2>
          </a>
          <p
            style={{
              fontSize: '15px',
            }}
          >
            {adData.adContent}
          </p>
        </div>
      )}
      <div className="icon">
        {!nav ? (
          ''
        ) : (
          <div>
            <div className="_icons">
              <div>
                <a
                  href="https://user.dframe.org/profile"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div className="icons">
                    <IoPersonSharp className="reactIcons" size={28} />
                    <p className="reactText">Profile</p>
                    <IoChevronForwardOutline size={23} className="reactArrow" />
                  </div>
                </a>
              </div>

              <div>
                {/* <a href="https://user.dframe.org/Wallet" rel="noopener noreferrer" style={{ textDecoration: 'none' }} target="_blank">
                                <div className='icons'>
                                    <img src={wallet} alt="Wallet Icon" className="reactIcons" />
                                    <p className='reactText'>Wallet</p>
                                    <IoChevronForwardOutline size={23} className='reactArrow' />
                                </div>
                            </a>
                            {/*<button onClick={() => chrome.tabs.create({ url: 'newtab.html' })}>Dashboard</button>*/}
              </div>

              <div>
                <a
                  href="https://user.dframe.org/data"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div className="icons">
                    <img
                      src={barChart}
                      alt="Bar Chart Icon"
                      className="reactIcons"
                    />
                    <p className="reactText">Data</p>
                    <IoChevronForwardOutline size={23} className="reactArrow" />
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://user.dframe.org/rewards"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div className="icons">
                    <img
                      src={reward}
                      alt="Payment Icon"
                      className="reactIcons"
                    />
                    <p className="reactText">Rewards</p>
                    <IoChevronForwardOutline size={23} className="reactArrow" />
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://user.dframe.org/analytics"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div className="icons">
                    <img
                      src={analytics}
                      alt="Analytics Icon"
                      className="reactIcons"
                    />
                    <p className="reactText">Analytics</p>
                    <IoChevronForwardOutline size={23} className="reactArrow" />
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://user.dframe.org/permissions"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div className="icons">
                    <img
                      src={permission}
                      alt="Permission Icon"
                      className="reactIcons"
                    />
                    <p className="reactText">Permissions</p>
                    <IoChevronForwardOutline size={23} className="reactArrow" />
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://user.dframe.org/help"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div className="icons">
                    <img src={info} alt="Info Icon" className="reactIcons" />
                    <p className="reactText">Help</p>
                    <IoChevronForwardOutline size={23} className="reactArrow" />
                  </div>
                </a>
              </div>
            </div>
            <div className="earning">
              <p>D Frame Balance :</p>
              <h2>
                {walletBalance ? walletBalance : `N.A. - Login to dashboard`}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="containers">
        <p className="containersText1">
          Current User:{' '}
          {userAddress && (
            <span className="containersText">
              {userAddress.toString().slice(0, 12) +
                '...' +
                userAddress.toString().slice(-12)}
            </span>
          )}
        </p>
      </div>
      <div className="logdash">
        **Click on Ad title to earn Ad Rewards**
        {/* <div>
          <button onClick={console.log('Logout')}>Logout</button>
        </div>
        <div> {!nav ? <a
                className="App-link"
                href="https://user.dframe.org"
            //rel="noopener noreferrer"
            >
                Go to dashboard!
            </a> : ""}
            </div> */}
      </div>
    </div>
  );
}
