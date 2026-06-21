export interface LinkType {
    name: string,
    href: string
}

export interface CompletedModalProps {
    logo: string,
    title: string,
    description: string,
    button: string
}

export interface ContextType {
    heroSection: {
        logo: string,
        backgroundImages: {
            mobile: string,
            desktop: string
        },
        Navbar: {
            icons: {
                closeIcon: string,
                openIcon: string
            },
            links: LinkType[]
        },
        donateSection: {
            logo: string,
            firstPart: {
                title: string,
                description: string,
                button: {
                    text: string,
                    icon: string
                }
            },
            secondPart: {
                totalPrice: string,
                totalBackers: string,
                leftDays: string
            },
            thirdPart: {
                title: string,
                description1: string,
                description2: string,
            },
            pledgeSection: {
                bambooStand: {
                    title: string,
                    price: string,
                    description: string,
                    button: {
                        active: string,
                        inActive: string
                    }
                },
                blackEdition: {
                    title: string,
                    price: string,
                    description: string,
                    button: {
                        active: string,
                        inActive: string
                    }
                },
                MahoganyEdition: {
                    title: string,
                    price: string,
                    description: string,
                    button: {
                        active: string,
                        inActive: string
                    }
                }
            }
        },
        SelectSection: {
            title: string,
            icon: string,
            description: string,
            NoRewards: {
                title: string,
                description: string,
                price: string,
                button: string,
                inform: string
            },
            BambooStand: {
                title: string,
                price: string,
                description: string,
                inform: string,
                button: string
            },
            BlackEdition: {
                title: string,
                price: string,
                description: string,
                inform: string,
                button: string
            },
            MahoganyEdition: {
                title: string,
                price: string,
                description: string,
                inform: string,
                button: string
            }
        },
        modelComplete: CompletedModalProps
    }
}
