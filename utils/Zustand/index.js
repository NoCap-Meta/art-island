import { create } from 'zustand';
import axios from 'axios';
import { convertMaticToUsd, web3 } from '@/pages/_app';

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
    id: '',
    username: '',
    shortBio: '',
    profilePic: '',
    email: '',
    walletAddress: '',
    website: '',
    twitter: '',
    instagram: '',
    boughtItems: [],
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
        const { displayName, username, _id, bio, walletAddress, google, socials, boughtItems } = data.user
        set(state => ({
          user: {
            displayName,
            username,
            id: _id,
            bio: bio,
            walletAddress,
            email: google.email,
            profilePic: google.profilePic,
            website: socials.website,
            twitter: socials.twitter,
            instagram: socials.instagram,
            boughtItems
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
      await window.ethereum.request({ method: 'eth_requestAccounts' });
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

//state to manage collection modal open
export const useCollectionModalStore = create(set => ({
  collectionModalOpen: false,
  setCollectionModalOpen: (value) => set(state => ({ collectionModalOpen: value }))
}))

//state to manage item modal data
export const useItemModalStore = create(set => ({
  itemModalData: {
    image: '',
    allImages:[],
    name: '',
    externalLink: '',
    desc: '',
    collectionId: '',
    createrAddress: '',
    blockchain: '',
    supply: '',
    freezeMetadata: false,
    properties: [],
    levels: [],
    stats: [],
    hasUnlockableContent: false,
    hasSensitiveContent: false,
    pricePerFraction: 0,
    fractions: 0,
    tokenId: '',
    royalty: 0
  },
  setItemModalData: (value) => set(state => ({ itemModalData: value }))
}))

//state to open state of item level modal
export const useItemLevelModalStore = create(set => ({
  itemLevelModalOpen: false,
  setItemLevelModalOpen: (value) => set(state => ({ itemLevelModalOpen: value }))
}))

//state to manage open status of item stats modal
export const useItemStatsModalStore = create(set => ({
  itemStatsModalOpen: false,
  setItemStatsModalOpen: (value) => set(state => ({ itemStatsModalOpen: value }))
}))

//state to manage captcha modal state
export const useCaptchaModalStore = create(set => ({
  captchaModalOpen: false,
  setCaptchaModalOpen: (value) => set(state => ({ captchaModalOpen: value }))
}))

//state to manage itemsubmitted modal 
export const useItemSubmittedModal = create(set => ({
  itemSubmittedModalOpen: false,
  setItemSubmittedModalOpen: (value) => set(state => ({ itemSubmittedModalOpen: value }))
}))

//state to manage selected item
export const useSelectedItemStore = create(set => ({
  selectedItem: null,
  setSelectedItem: async (id, value) => {
    if (value) {
      set(state => ({ selectedItem: value }))
    } else {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${id}`)
      if (data.success) {
        const usdPrice = await convertMaticToUsd(data.item.pricePerFraction)
        set({ selectedItem: { ...data.item, usdPrice } })
      }
    }
  }
}))

//state to manage open state of deliverable modal
export const useDeliverableModalStore = create(set => ({
  deliverableModalOpen: false,
  setDeliverableModalOpen: (value) => set(state => ({ deliverableModalOpen: value }))
}))





