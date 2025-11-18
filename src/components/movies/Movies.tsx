"use client"
import data from "@/assets/data.json";
import { useState } from "react";
import Image from "next/image";
import { TvCategory, MovieCategory } from "./WhatCategory";
import Dot from "../ui/Dot";
import DetailsMovie from "../ui/DetailsMovie";
import TitleMovie from "../ui/TitleMovie";
import { BookMark } from "./BookMark";
import type { Root } from "@/types/Movie";

const options = {
    Home: "Recommended for you",
    Movie: "Movies",
    "TV Series": "TV Series",
    BookMark: {
        Movie: "Bookmarked Movies",
        "TV Series": "Bookmarked TV Series"
    }
}

export default function Movies({filter}: {filter: "Home"|"Movie"|"TV Series"|"BookMark"}) {
    const [allMovies, setAllMovies] = useState<Root>(data);

    const [search, setSearch] = useState<string>("");

    function addRemoveBookMark (movieTitle: string) {
        setAllMovies((prev) => {
            const moviesCopy = [...prev];
            const indexMovie = moviesCopy.findIndex(movie => movie.title === movieTitle);
            const movie = moviesCopy[indexMovie];
            let newMovie = {
                ...movie,
                isBookmarked: !movie.isBookmarked
            }
            moviesCopy[indexMovie] = newMovie;
            return moviesCopy;
        })
    } 

    
   
    return (
        <section className="overflow-hidden">
            <search className="w-full">
                <form role="search">
                    <div className="flex gap-200 items-center xl:min-w-[1276px]">
                        <Image className="md:scale-125" src="/assets/icon-search.svg" width={24} height={24} alt="Search" />
                        <input onChange={(e) => setSearch(e.target.value.trim())} value={search} className={`hover:border-b-white caret-red-500 hover:border-b border-b focus:border-b-white border-transparent cursor-pointer focus:outline-0 focus:outline-transparent py-3 grow text-present-2-light-mobile md:text-2xl text-white placeholder-white/30`} type="search" name="search" id="search" placeholder="Search for movies or TV series" />

                    </div>
                </form>
            </search>
            {/* Movies */}
            <section className="flex flex-col gap-300">
                {/* Trending */}
                {
                    filter === 'Home' && search === '' &&

                    <section>
                        <h1 className="text-present-1-light-mobile text-white mb-200 md:text-[32px]">Trending</h1>
                        <div className="flex gap-200 flex-nowrap overflow-visible overflow-x-scroll">
                            {allMovies.map(({year, category, isTrending, isBookmarked, rating, title, thumbnail}, key) => {
                                if (isTrending) {
                                    return (
                                                <div key={key} className="show-play cursor-pointer min-w-60 h-[140px] md:h-[230px] md:min-w-[470px] relative rounded-2xl overflow-hidden">
                                                    <div className="play hidden w-[120px] h-600 absolute top-1/2 left-1/2 -translate-1/2 z-10 items-center gap-200 p-2 rounded-[30px] bg-white/25 border border-blue-500/25">
                                                        <Image src="/assets/icon-play.svg" width={30} height={30} alt="Play" />
                                                        <p className="text-white text-present-3-medium">Play</p>
                                                    </div>
                                                    <BookMark isBookmarked={isBookmarked} title={title} addRemoveBookMark={addRemoveBookMark} />
                                                    {thumbnail.trending && <Image className=" w-full h-full object-contain relative" src={thumbnail.trending.large} alt={title} width={240} height={140}  />}
                                                    
                                                    <div className="absolute z-10 left-[10%] bottom-[10%] flex flex-col gap-2">
                                                        <div className="flex gap-2 items-center">
                                                            <DetailsMovie text={year.toString()} />
                                                            <Dot />
                                                            <div className="flex gap-1">
                                                                {category == 'Movie' ? <MovieCategory /> : category == 'TV Series' ? <TvCategory /> : "" }
                                                                <DetailsMovie text={category} />
                                                            </div>
                                                            <Dot />
                                                            <DetailsMovie text={rating} />
                                                        </div>
                                                        <TitleMovie text={title} />
                                                    </div>
                                                </div>
                                            )
                                }
                            })}

                        </div>
                    </section>
                }
                {/* Recommended for you */}
                {
                    search !== '' && search.length >= 3 &&        
                    <section>
                        <h1 className="text-present-1-light-mobile text-white mb-200 md:text-[32px]">
                            Found {} result form &apos;{search}&apos;
                        </h1>
                        <section className="grid grid-cols-2 gap-200 md:grid-cols-3 md:gap-300 lg:grid-cols-4">
                            {
                            allMovies.filter(({title}) => {
                                
                                return title.includes(search) 
                            }).map(({year, category, isBookmarked, rating, title, thumbnail}, key) => (
                                <div key={key} className="flex flex-col gap-2">
                                    <div className="show-play cursor-pointer relative rounded-2xl overflow-hidden h-[110px] md:min-h-[140px]">
                                        <div className="play hidden w-[120px] h-600 absolute top-1/2 left-1/2 -translate-1/2 z-10 items-center gap-200 p-2 rounded-[30px] bg-white/25 border border-blue-500/25">
                                            <Image src="/assets/icon-play.svg" width={30} height={30} alt="Play" />
                                            <p className="text-white text-present-3-medium">Play</p>
                                        </div>
                                        <BookMark isBookmarked={isBookmarked} title={title} addRemoveBookMark={addRemoveBookMark} />
                                        <Image className=" w-full relative object-contain" src={thumbnail.regular.medium} alt={title} width={240} height={140}  />

                                    </div>
                                    {/* Information Movie */}
                                    <div className="flex flex-col gap-2 ">
                                        <div className="flex gap-2 items-center">
                                            <DetailsMovie text={year.toString()} />
                                            <Dot />
                                            <div className="flex gap-1">
                                                {category == 'Movie' ? <MovieCategory /> : category == 'TV Series' ? <TvCategory /> : "" }
                                                <DetailsMovie text={category} />
                                            </div>
                                            <Dot />
                                            <DetailsMovie text={rating} />
                                        </div>
                                        <TitleMovie text={title} />
                                    </div>
                                    
                                </div>
                            ))}
                        </section>


                    </section>
                }
                {
                    filter !== 'BookMark' &&  search === ''  &&      
                    <section>
                        <h1 className="text-present-1-light-mobile text-white mb-200 md:text-[32px]">
                            {options[filter]}
                        </h1>
                        <section className="grid grid-cols-2 gap-200 md:grid-cols-3 md:gap-300 lg:grid-cols-4">
                            {
                            allMovies.filter(({category}) => {
                                if (filter === 'Home') return true
                                return category === filter
                            }).map(({year, category, isBookmarked, rating, title, thumbnail}, key) => (
                                <div key={key} className="flex flex-col gap-2">
                                    <div className="show-play cursor-pointer relative rounded-2xl overflow-hidden h-[110px] md:min-h-[140px]">
                                        <div className="play hidden w-[120px] h-600 absolute top-1/2 left-1/2 -translate-1/2 z-10 items-center gap-200 p-2 rounded-[30px] bg-white/25 border border-blue-500/25">
                                            <Image src="/assets/icon-play.svg" width={30} height={30} alt="Play" />
                                            <p className="text-white text-present-3-medium">Play</p>
                                        </div>
                                        <BookMark isBookmarked={isBookmarked} title={title} addRemoveBookMark={addRemoveBookMark} />
                                        <Image className=" w-full relative object-contain" src={thumbnail.regular.medium} alt={title} width={240} height={140}  />

                                    </div>
                                    {/* Information Movie */}
                                    <div className="flex flex-col gap-2 ">
                                        <div className="flex gap-2 items-center">
                                            <DetailsMovie text={year.toString()} />
                                            <Dot />
                                            <div className="flex gap-1">
                                                {category == 'Movie' ? <MovieCategory /> : category == 'TV Series' ? <TvCategory /> : "" }
                                                <DetailsMovie text={category} />
                                            </div>
                                            <Dot />
                                            <DetailsMovie text={rating} />
                                        </div>
                                        <TitleMovie text={title} />
                                    </div>
                                    
                                </div>
                            ))}
                        </section>


                    </section>
                }
                {/* Bookmark */}
                {
                    filter == 'BookMark' &&      
                    <>
                    
                        <section>
                            {/* Bookmark Movies */}
                            <h1 className="text-present-1-light-mobile text-white mb-200 md:text-[32px]">
                                {options[filter].Movie}
                            </h1>
                            <section className="grid grid-cols-2 gap-200 md:grid-cols-3 md:gap-300 lg:grid-cols-4">
                                {
                                allMovies.filter(({isBookmarked, category}) => {
                                    return isBookmarked && category === "Movie"
                                }).map(({year, category, isBookmarked, rating, title, thumbnail}, key) => (
                                    <div key={key} className="flex flex-col gap-2">
                                        <div className="show-play cursor-pointer relative rounded-2xl overflow-hidden h-[110px] md:min-h-[140px]">
                                            <div className="play hidden w-[120px] h-600 absolute top-1/2 left-1/2 -translate-1/2 z-10 items-center gap-200 p-2 rounded-[30px] bg-white/25 border border-blue-500/25">
                                                <Image src="/assets/icon-play.svg" width={30} height={30} alt="Play" />
                                                <p className="text-white text-present-3-medium">Play</p>
                                            </div>
                                            <BookMark isBookmarked={isBookmarked} title={title} addRemoveBookMark={addRemoveBookMark} />
                                            <Image className=" w-full relative" src={thumbnail.regular.large} alt={title} width={240} height={140}  />

                                        </div>
                                        {/* Information Movie */}
                                        <div className="flex flex-col gap-2 ">
                                            <div className="flex gap-2 items-center">
                                                <DetailsMovie text={year.toString()} />
                                                <Dot />
                                                <div className="flex gap-1">
                                                    {category == 'Movie' ? <MovieCategory /> : category == 'TV Series' ? <TvCategory /> : "" }
                                                    <DetailsMovie text={category} />
                                                </div>
                                                <Dot />
                                                <DetailsMovie text={rating} />
                                            </div>
                                            <TitleMovie text={title} />
                                        </div>
                                        
                                    </div>
                                ))}
                            </section>
                        </section>

                        <section>
                            {/* Bookmark Movies */}
                            <h1 className="text-present-1-light-mobile text-white mb-200 md:text-[32px]">
                                {options[filter]["TV Series"]}
                            </h1>
                            <section className="grid grid-cols-2 gap-200 md:grid-cols-3 md:gap-300 lg:grid-cols-4">
                                {
                                allMovies.filter(({isBookmarked, category}) => {
                                    return isBookmarked && category === "TV Series"
                                }).map(({year, category, isBookmarked, rating, title, thumbnail}, key) => (
                                    <div key={key} className="flex flex-col gap-2">
                                        <div className="show-play cursor-pointer relative rounded-2xl overflow-hidden h-[110px] md:min-h-[140px]">
                                            <div className="play hidden w-[120px] h-600 absolute top-1/2 left-1/2 -translate-1/2 z-10 items-center gap-200 p-2 rounded-[30px] bg-white/25 border border-blue-500/25">
                                                <Image src="/assets/icon-play.svg" width={30} height={30} alt="Play" />
                                                <p className="text-white text-present-3-medium">Play</p>
                                            </div>
                                            <BookMark isBookmarked={isBookmarked} title={title} addRemoveBookMark={addRemoveBookMark} />
                                            <Image className=" w-full relative" src={thumbnail.regular.large} alt={title} width={240} height={140}  />

                                        </div>
                                        {/* Information Movie */}
                                        <div className="flex flex-col gap-2 ">
                                            <div className="flex gap-2 items-center">
                                                <DetailsMovie text={year.toString()} />
                                                <Dot />
                                                <div className="flex gap-1">
                                                    {category == 'Movie' ? <MovieCategory /> : category == 'TV Series' ? <TvCategory /> : "" }
                                                    <DetailsMovie text={category} />
                                                </div>
                                                <Dot />
                                                <DetailsMovie text={rating} />
                                            </div>
                                            <TitleMovie text={title} />
                                        </div>
                                        
                                    </div>
                                ))}
                            </section>


                        </section>
                    </>    
                }
            </section>
        </section>
    )
}