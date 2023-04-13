import { create } from 'zustand';
import axios from 'axios';
import { web3 } from '@/pages/_app';

//manage cart open
export const useCartStore = create(set => ({
  cartOpen: false,
  setCartOpen: (value) => set(state => ({ cartOpen: value }))
}))


export const useTabStore = create(set => ({
  selectedTab: 'Profile',
  setSelectedTab: (value) => set(state => ({ selectedTab: value }))
}))

//manage createItemModalState
export const useCreateItemStore = create(set => ({
  createItemModalState: false,
  setCreateItemModalState: (value) => set(state => ({ createItemModalState: value }))
}))

//state to manage user data displayname, username, shortbio, profilepic, email, walletaddress, website, twitter, instagram
export const useUserStore = create(set => ({
  user: {
    displayName: '',
    username: '',
    shortBio: '',
    profilePic: '',
    email: '',
    walletAddress: '',
    website: '',
    twitter: '',
    instagram: ''
  },
  setUser: async (value) => {
    if (!value) {
      //fetch details from api
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (data.success) {
        const { displayName, username, bio, walletAddress, google, socials } = data.user
        set(state => ({
          user: {
            displayName,
            username,
            shortBio: bio,
            walletAddress,
            email: google.email,
            profilePic: google.profilePic,
            website: socials.website,
            twitter: socials.twitter,
            instagram: socials.instagram
          }
        }))
      }
    } else {
      set(state => ({ user: value }))
    }
  }
}))


//state to manage wallet address
export const useWalletStore = create(set => ({
  walletAddress: '',
  setWalletAddress: async (value) => {
    //get account from metamask
    if (!value && typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      web3.eth.getAccounts().then(accounts => {
        set(state => ({ walletAddress: accounts[0] }))
      })
    } else {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, { walletAddress: value }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      if (data?.success) {
        set(state => ({ walletAddress: value }))
      }
    }
  }
}))


export const useArtistProfileOptionsStore = create(set => ({
  artistProfileOptions: [
    {
      name: "Featured",
      selected: true,
    },
    {
      name: "Collected",
      selected: false,
    },
    {
      name: "Created",
      selected: false,
    },
    {
      name: "Favourites",
      selected: false,
    },
    {
      name: "Activity",
      selected: false,
    },
    {
      name: "Transaction History",
      selected: false,
    }
  ],
  setArtistProfileOptions: (value) => set(state => ({ artistProfileOptions: value }))
}))

export const useSelectedArtistProfileTab = create(set => ({
  selectedArtistProfileTab: 'Featured',
  setSelectedArtistProfileTab: (value) => set(state => ({ selectedArtistProfileTab: value }))
}))



