import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '../components/Icon'
import { colors } from '../styles/tokens.stylex'
import NewsPreview from '../components/NewsPreview'
import { QuoteBlock } from '../components/QuoteBlock'
import Footer from '../components/Footer'
import { Slider } from '../components/Slider'
import { PostCard } from '../components/PostCard'

interface Category {
    id: number
    name: string
    icon_key: string
}

interface Post {
    id: number
    title: string
    description: string
    image_url: string
    location: string
    event_date: string
    event_time: string
    category?: {
        name: string
    }
}

const slideLeft = stylex.keyframes({
    from: { opacity: 0, transform: 'translateX(-50%)' },
    to: { opacity: 1, transform: 'translateX(0)' },
})

export default function VolunteerDashboard() {
    const [categories, setCategories] = useState<Category[]>([])
    const [posts, setPosts] = useState<Post[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    )

    const [isHovered, setIsHovered] = useState<number | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>(
                    `${import.meta.env.VITE_API_URL}/volunteer-dashboard/categories`
                )
                setCategories(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        void fetchCategories()
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<Post[]>(
                    `${import.meta.env.VITE_API_URL}/volunteer-dashboard/posts`,
                    {
                        params: { categoryId: selectedCategoryId },
                    }
                )
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        void fetchPosts()
    }, [selectedCategoryId])

    const selectedCategory = categories.find(
        (cat) => cat.id === selectedCategoryId
    )
    const categoryName = selectedCategory ? selectedCategory.name : 'All'

    return (
        <div {...stylex.props(styles.pageWrapper)}>
            <Header />

            <div className="categories-list">
                <h2 {...stylex.props(styles.h2)}>Categories</h2>
                <div {...stylex.props(styles.categoriesSection)}>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <div
                                {...stylex.props(styles.categoryButton)}
                                onMouseEnter={() => setIsHovered(category.id)}
                                onMouseLeave={() => setIsHovered(null)}
                            >
                                <button
                                    {...stylex.props(styles.button)}
                                    onClick={() =>
                                        setSelectedCategoryId(
                                            selectedCategoryId === category.id
                                                ? null
                                                : category.id
                                        )
                                    }
                                >
                                    <Icon
                                        variant="blue"
                                        size="medium"
                                        iconName={category.icon_key}
                                    />
                                </button>
                                <div
                                    {...stylex.props(
                                        styles.tip,
                                        isHovered === category.id &&
                                            styles.tipVisible
                                    )}
                                >
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2 {...stylex.props(styles.h2)}>
                {selectedCategoryId
                    ? `New Requests: ${categoryName}`
                    : 'New Requests'}
            </h2>

            <Slider
                key={selectedCategoryId ?? 'all'}
                items={posts}
                itemsPerPage={4}
                renderItem={(post) => <PostCard post={post} />}
            />
            <QuoteBlock />
            <NewsPreview />
            <Footer />
        </div>
    )
}

const styles = stylex.create({
    arms: {
        cursor: 'pointer',
        transformOrigin: 'center',

        userSelect: 'none',
        width: '100px',
    },
    rightArm: {
        transform: 'rotate(-62deg)',
    },
    leftArm: {
        transform: 'rotate(62deg)',
    },
    pageWrapper: {
        overflow: 'hidden',
        minHeight: '100vh',
    },
    img: {
        alignSelf: 'flex-end',
        position: 'absolute',
        transform: 'translateX(-50%)',
        bottom: 0,
        left: '50%',
    },
    h2: {
        animationDuration: '2s',
        animationName: slideLeft,

        color: colors.primaryBrown,
        marginLeft: '20px',
        marginTop: '30px',
    },
    categoriesSection: {
        gap: '10px',
        alignItems: 'center',
        backgroundColor: '#EBEEF6',
        display: 'flex',
        justifyContent: 'center',
        height: '115px',
    },
    categoryButton: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
    },
    button: {
        borderColor: '#CBD1E8',

        borderRadius: '30px',

        borderStyle: 'solid',

        borderWidth: '11px',

        outline: 'none',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        alignItems: 'center',

        backgroundColor: colors.white,
        boxShadow: {
            default: 'none',
            ':hover': '0 3px 5px 0 rgba(0,0,0,0.6)',
        },

        cursor: 'pointer',
        height: '85px',
        width: '90px',
    },
    tip: {
        padding: '5px',

        borderColor: ' #CBD1E8',

        borderRadius: '10px',

        borderStyle: 'solid',

        borderWidth: '2px',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        backgroundColor: 'white',
        boxShadow: '0 3px 5px 0 rgba(0,0,0,0.6)',
        color: colors.primaryBrown,
        fontFamily: 'sans-serif',
        opacity: '0',
        position: 'absolute',
        textAlign: 'center',
        zIndex: 100,
        bottom: '115%',
    },
    tipVisible: {
        opacity: '1',
    },
    sliderContainer: {
        paddingInline: '60px',

        backgroundColor: '#EBEEF6',

        boxSizing: 'border-box',

        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
    },
    sliderWindow: {
        overflow: 'hidden',

        paddingBottom: '10px',

        paddingTop: '40px',
        width: '100%',
    },
    postListTrack: {
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
    },
    slideItem: {
        flex: '0 0 25%',

        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
    },
    controlsWrapper: {
        gap: '70px',
        display: 'flex',
        justifyContent: 'center',
    },
    navButtonDisabled: {
        cursor: 'default',
        opacity: 0.3,
        pointerEvents: 'none',
    },
})
