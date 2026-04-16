import api from '../../api/axios'
import { useState } from 'react'
import { Header } from '../../components/Header'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '../../components/Icon'
import { colors } from '../../styles/tokens.stylex'
import NewsPreview from '../../components/NewsPreview'
import { QuoteBlock } from '../../components/QuoteBlock'
import Footer from '../../components/Footer'
import { Slider } from '../../components/Slider'
import { PostCard } from '../../components/PostCard'
import { MakeNewsBlock } from '../../components/MakeNewsBlock'
import { useQuery } from '@tanstack/react-query'
import { NavigateButtons } from '../../components/NavigateButtons'
import { MakeRequestBlock } from '../../components/MakeRequestBlock'
import { Background } from '../../components/Background'

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

const fetchPosts = async (categoryId: number | null) => {
    const { data } = await api.get<Post[]>('/posts/category', {
        params: { categoryId },
    })
    return data
}

const fetchCategories = async () => {
    const { data } = await api.get<Category[]>('/categories')
    return data
}

export default function VolunteerDashboard() {
    const [isHovered, setIsHovered] = useState<number | null>(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    )

    const { data: categories = [], isLoading: isCatsLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const { data: posts = [], isLoading: isPostsLoading } = useQuery({
        queryKey: ['posts', selectedCategoryId],
        queryFn: () => fetchPosts(selectedCategoryId),
    })

    const selectedCategory = categories.find(
        (cat) => cat.id === selectedCategoryId
    )
    const categoryName = selectedCategory ? selectedCategory.name : 'All'

    if (isCatsLoading)
        return (
            <Background variant="img">
                {' '}
                <div style={{ color: 'white' }}>Loading...</div>
            </Background>
        )

    return (
        <div {...stylex.props(styles.pageWrapper)}>
            <NavigateButtons />
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

            {isPostsLoading ? (
                <div {...stylex.props(styles.statusMessage)}>
                    Loading posts...
                </div>
            ) : posts.length === 0 ? (
                <div {...stylex.props(styles.statusMessage, styles.noPosts)}>
                    <Icon variant="blue" size="medium" iconName="info" />
                    <p>No posts available in this category yet.</p>
                </div>
            ) : (
                <Slider
                    key={selectedCategoryId ?? 'all'}
                    items={posts}
                    itemsPerPage={4}
                    renderItem={(post) => <PostCard post={post} />}
                />
            )}
            <MakeRequestBlock />
            <QuoteBlock />
            <NewsPreview />
            <MakeNewsBlock />
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
    statusMessage: {
        borderRadius: '20px',
        gap: '15px',

        marginInline: '20px',
        paddingBlock: '80px',
        paddingInline: '20px',
        alignItems: 'center',

        backgroundColor: '#EBEEF6', // щоб збігалося з фоном слайдера
        color: colors.primaryBlue,

        display: 'flex',

        flexDirection: 'column',

        fontSize: '1.2rem',
        textAlign: 'center',
    },
    noPosts: {
        color: colors.primaryBrown,
        fontStyle: 'italic',
        opacity: 0.8,
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
