import api from '../../api/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import NewsItem from '../../components/NewsItem'
import type { Article } from '../../types/news'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import FloatingBackground from '../../components/FloatingBackground'
import { Home } from '../../components/Home'

const fetchNews = async ({ pageParam = 1 }) => {
    console.log(`fetching page: ${pageParam}`)
    const { data } = await api.get<Article[]>(
        `${import.meta.env.VITE_API_URL}/news/dashboard`,
        {
            params: {
                page: pageParam,
                limit: 10,
            },
        }
    )
    return data
}

export default function NewsDashboard() {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '0px',
    })

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ['news'],
            queryFn: fetchNews,
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage || lastPage.length < 10) return undefined
                return allPages.length + 1
            },
            staleTime: 10000,
        })

    useEffect(() => {
        const delay = setTimeout(() => {
            if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
                void fetchNextPage()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [inView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage])

    const allArticles = data?.pages.flatMap((page) => page) || []

    const uniqueArticles = Array.from(
        new Map(allArticles.map((item) => [item.id, item])).values()
    )

    return (
        <FloatingBackground>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '40px 0',
                }}
            >
                <Home />
                {isLoading ? (
                    <div style={{ color: 'white' }}>Loading News...</div>
                ) : (
                    <>
                        {uniqueArticles.map((item) => (
                            <NewsItem key={item.id} item={item} />
                        ))}

                        <div
                            ref={ref}
                            style={{
                                height: '100px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {isFetchingNextPage && (
                                <div style={{ color: 'white' }}>
                                    Loading more...
                                </div>
                            )}
                            {!hasNextPage && (
                                <div
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    Thats all for today!
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </FloatingBackground>
    )
}
