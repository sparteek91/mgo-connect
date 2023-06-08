interface IProducts {
    title: string,
    fragment: string,
    items: IItems[],
}

interface IItems {
    title: string,
    description: string,
    imageUrl: string,
    availableVideos?: string[],
    videoSrc?: string,
    brochureSrc?: string,
}

export const PRODUCT_FEATURES: IProducts[] = [
    {
        title: 'Permits & Licensing',
        fragment: 'permits',
        items: [
            {
                title: 'Permits & Licensing',
                description: `This module allows you to do anything
          you’d normally do in-person at your local
          permitting office. Apply for permits, pay
          online, request inspections, submit files,
          download inspection reports and
          approved plans, check permit status,
          download permit data, search for
          permits, and manage contractor and
          business licenses.
          Any type of permit can be issued not
          only Building Permits. We have
          customers that use our software for Sign,
          Driveway, Transportation, Alcohol and
          many other types of permits.`,
                imageUrl: '/assets/images/Permitting.svg',
                availableVideos: ['English'],
                videoSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOVideos/MGO_Permits_English.mp4',
                brochureSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOBrochures/MGO-Digital_Brochure.pdf'
            },
            {
                title: 'Business Licensing',
                description: `This is a license to open a business
          either at home or a store.
          Some jurisdictions call this Business Tax
          Receipts. Allows the jurisdiction to
          renew the license each year and the
          business owner to pay the annual fee.
          Ability to handle renewals for any time
          period (Annual or Monthly) and
          automatically calculate any late fees.`,
                imageUrl: '/assets/images/businessLicensing.svg',
            },
            {
                title: 'Fire Permits & Inspections',
                description: `Fire permits and annual inspections`,
                imageUrl: '/assets/images/Fire.svg',
            },
        ]
    },
    {
        title: 'Land Management',
        fragment: 'landManagement',
        items: [
            {
                title: 'Planning and Zoning',
                description: `Similar functionality to permits module
          but with greater focus on subdivision and
          parcel tracking. Also, special focus on
          meeting dates and public announcements with powerful project management features.`,
                imageUrl: '/assets/images/Planning.svg',
                brochureSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOBrochures/MGO-Planning_and_Zoning.pdf'
            },
            {
                title: 'Land Management / GIS',
                description: `Unlimited GIS integration with the ability
          to receive data or create data directly in
          the GIS. Many out of the box map features that do not require GIS integration.
          Full property management database to
          track unlimited property data including
          address, subdivision, parcel and other
          land management warnings.`,
                imageUrl: '/assets/images/LandManagement-GIS.svg',
            },
            {
                title: 'Property Management',
                description: `Adjudicated Property Tracking, other
          special property tracking such as “Lot
          Next Door” or other types of special property programs.`,
                imageUrl: '/assets/images/propertysqAsset6.svg',
            },
        ]
    },
    {
        title: 'Assets & CMMS',
        fragment: 'assets',
        items: [
            {
                title: 'Public Works',
                description: `Custom modules for all divisions that allow for field inspections, 
          asset tracking and many other customized features for things such as septic tracking, 
          waste water, grease interceptors and more. Full time, materials and labor cost tracking. 
          Map based issue creation and reporting.`,
                imageUrl: '/assets/images/PublicWorks.svg',
                availableVideos: ['English'],
                videoSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOVideos/MGO_PublicWorks_English.mp4',
                brochureSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOBrochures/MGO+-+Public+Works.pdf'
            },
            {
                title: 'Asset Tracking',
                description: `Ability to track any asset on a map, GPS and RFID tracking. 
                Automated service alerts and full work orders tracking integration available with CMMS management`,
                imageUrl: '/assets/images/MGOASSETSICON.svg',
                brochureSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOBrochures/Asset+Tracking.pdf'
            },
            {
                title: 'Fleet Maintenance',
                description: `Keeps track of work performed on vehicles. 
          Provides the functionality that a mechanic shop needs along with special integration 
          with asset tracking that are specific to government. 
          Service Request, Inventory Management, Automated Service Alerts and Billing. 
          Integrated with GPS for automated odometer and engine hour alerts. 
          Shows vehicle complete service history.`,
                imageUrl: '/assets/images/Fleet.svg',
            },
            {
                title: 'Facilities',
                description: `Ability to track different facilities, 
          set automated service alerts, 
          track work orders on maintenance and repair items.`,
                imageUrl: '/assets/images/facilitiessqAsset8.svg',
            },
        ]
    },
    {
        title: 'Community Engagement',
        fragment: 'engagement',
        items: [
            {
                title: 'Solution Center (311 / Call Center / Code Enforcement',
                description: `Ability for the public to submit any issue to the jurisdiction through a website or mobile app. 
          Service requests can be for any department with types such as public records requests, 
          road repair, tall grass, highway damage, and abandoned vehicles. 
          Additionally, each service request can be configured to route through the call center 
          or directly to the department responsible for service.`,
                imageUrl: '/assets/images/solutionCenter.svg',
                availableVideos: ['English'],
                videoSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOVideos/MGO_SolutionCenter_English.mp4',
                brochureSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOBrochures/MGO-Solution_Center.pdf',
            },
            {
                title: 'MGO Connect',
                description: `Public Portal for members of the public to do business with their city 
          without having to comment to their office. 
          Submit online requests and chat with city staff.`,
                imageUrl: '/assets/images/MGOCONNECT.svg'
            },
        ]
    },
    {
        title: 'More',
        fragment: 'more',
        items: [
            {
                title: 'Project Guide',
                description: `Project Guide integrates with a jurisdiction website.
                 It allows a user unfamiliar with the applications required for their project to answer questions about what they want to build and Project Guide will generate a list of the required permits to build their project.
                  It can also provide an estimate of fees and even list permits with other agencies from external sources giving the user a one stop shop experience.`,
                imageUrl: '/assets/images/Project Guide_Icon-02.png',
                videoSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOVideos/MGO+Project+Guide+Overview.mp4',
                brochureSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOBrochures/MGO+Project+Guide+Digital.pdf',
            },
            {
                title: 'Grant Management',
                description: `Track grant information and drawdowns along with all inspections. 
                Popular to use for housing condemnation programs and CDBG.`,
                imageUrl: '/assets/images/granssqAsset7.svg',
            },
            {
                title: 'MGO Tasks',
                description: `Mobile app used by city staff to communicate with customers and complete any assigned task. 
                Also includes project and time management features.`,
                imageUrl: '/assets/images/MGOTASKS.svg'
            },
        ]
    }
];