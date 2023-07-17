/*=====  DETAIL  ======*/
/**
 * @function Content
 * @param {Object} props - The props for the Content component.
 * @param {string} props.content - The content to be displayed.
 * @param {string} props.title - The title of the content.
 * @returns {JSX.Element} - A JSX element consisting of the title and content in a formatted manner.
 * @description This is a reusable component that takes in a title and content and displays them in a pre-defined, consistent format. The format includes the design of the text and paragraph structure as well as overall layout.
 */

/**
 * @function Details
 * @returns {JSX.Element} - A JSX element that displays the details of the selected item including its description, collection, token details, and possibly location details.
 * @description This component retrieves the selected item's details from the Zustand store and displays it. This includes a description of the item, details of the collection it belongs to, its token ID and address, and if available, an embedded Google Maps view showing the location of the item. This information is separated into distinct sections, each with their respective headings, for clarity and readability.
 */



/*=====  HERO  ======*/
/**
 * @function PropertiesCard
 * @param {Object} prop - The property object which contains details about the property
 * @returns {JSX.Element} - A styled div component displaying details about the property
 * @description This is a functional component that accepts a property object. It uses this to display information about a given property in a styled manner.
 */

/**
 * @function ArtPageHero
 * @returns {JSX.Element} - A complex div component that incorporates other components and hooks, displays information about the selected item
 * @description This is a functional component which retrieves and manages a variety of information related to a selected item in an e-commerce context.
 * It features several sub-components and makes use of hooks for state management, as well as interacting with an external API. It also integrates with the Metamask
 * API for purchases using Ethereum's blockchain. 
 */

/**
 * @hook useState
 * @description This is a React hook that lets you add React state to function components. State is a way for a component to maintain and change its own data. 
 */

/**
 * @hook useEffect
 * @description This is a React hook that allows for side-effects in function components. Side-effects could be anything from data fetching, subscriptions, 
 * manually changing the DOM, and so on. 
 */

/**
 * @hook useContext
 * @description This is a React hook that allows you to access the value of the nearest parent context. In this case, it is used to get the `activeModal` and `setActiveModal` states.
 */

/**
 * @hook useUserStore
 * @description This is a Zustand hook which allows for state management. It allows for the setting and getting of the `user` state.
 */

/**
 * @hook useSelectedItemStore
 * @description This is a Zustand hook which allows for state management. It allows for the setting and getting of the `selectedItem` state.
 */

/**
 * @function handleBuyNFTUser
 * @description This function is used to handle the buying of NFTs by a user. It's used within the `onClick` of the Buy Now button.
 */

/**
 * @function useCheckMetamask
 * @description This is a custom hook that provides a function for checking if Metamask is installed in the user's browser. 
 */

/**
 * @function parse
 * @description This function is used to parse HTML strings into React components. 
 */

/**
 * @function useRouter
 * @description This is a hook from Next.js that allows you to control the router. You can navigate to different pages or retrieve information about the current route with this hook.
 */



/*=====  ITEM ACTIVITY  ======*/
/**
 * @function FilterBubble
 * @param {Object} props - The properties passed into the FilterBubble component
 * @param {String} props.name - The name of the filter bubble
 * @param {Function} props.onClick - The function to be called when the filter bubble is clicked
 * @returns {JSX.Element} - A styled div component containing the name of the filter and a cross icon to remove the filter
 * @description This component is used to display individual filter bubbles with a provided name. An onClick function is provided that will be called when the filter bubble is clicked.
 */

/**
 * @function FilterList
 * @param {Object} props - The properties passed into the FilterList component
 * @param {Function} props.handleFilter - The function to be called when a filter is clicked
 * @returns {JSX.Element} - A styled div component containing a list of filter items
 * @description This component is used to display a list of filters. A handleFilter function is provided that will be called when a filter is clicked.
 */

/**
 * @function TableCell
 * @param {Object} props - The properties passed into the TableCell component
 * @param {String} props.children - The child components to be rendered within the TableCell component
 * @param {String} props.width - The width of the TableCell component
 * @param {String} props.text - The text to be displayed within the TableCell component
 * @param {String} props.font - The font to be used for the text within the TableCell component
 * @param {Boolean} props.right - Determines if the children should be displayed on the right side of the TableCell
 * @returns {JSX.Element} - A styled div component that acts as a cell within a table
 * @description This component is used to display individual cells within a table. It can optionally contain child components, have a specified width, display text with a specified font, and display children on the right side of the cell.
 */

/**
 * @function ItemActivity
 * @returns {JSX.Element} - A complex div component that incorporates other components and hooks, displays information about the selected item's activities
 * @description This is a functional component which retrieves and manages a variety of information related to the activity of a selected item in an e-commerce context.
 * It features several sub-components and makes use of hooks for state management.
 */


/*=====  RELIST HERO  ======*/
/**
 * @component PropertiesCard
 * @param {Object} prop - Contains information about the property.
 * @returns {JSX.Element} - Returns a stylized card with property details.
 * @description This is a reusable card component for displaying property details.
 */

/**
 * @component RelistArtPageHero
 * @returns {JSX.Element} - Returns a full page component containing the artwork details.
 * @description This component is the main component of the relist art page. It shows the art details, images, properties, bid and ask prices, and provides interactions such as liking the art, opening bid or relist modal, etc.
 */

/**
 * @function handleLike
 * @description This function handles the like functionality of an artwork. It makes an API call to the server to post a like for the item. It will open a Google login modal if there is no token in the local storage.
 */

/**
 * @function getRelist
 * @description This async function makes two API calls. The first call fetches all the relistings of the current item and the second one fetches all buy list of the current item. Both relistings and buy list are then set to their corresponding states.
 */

/**
 * @function handleImage
 * @param {String} id - The ID of the image to be handled.
 * @description This function sets an image as selected and updates the states of all images and the selected image.
 */

/**
 * @hook useEffect
 * @description This hook is executed when the `item` prop changes. It initializes the images and fetches relistings and buy list for the current item by calling the `getRelist` function.
 */

