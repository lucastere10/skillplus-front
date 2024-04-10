'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

export function About() {

    return (
        <div className="bg-gray-100 dark:bg-[#121212] h-screen">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white dark:bg-[#202c34] shadow rounded-lg p-6">
                            <div className="flex flex-col items-center ">
                                <img src="https://lucastere10.github.io/portfolio/images/profile.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
                                </img>
                                <h1 className="text-xl font-bold">Lucas Caldas</h1>
                                <p className="text-gray-700 dark:text-white">Aspirante a Desenvolvedor</p>
                                <div className='flex flex-col'>
                                    <h3 className="font-semibold text-center mt-3 mb-2">
                                        Contatos
                                    </h3>
                                    <div className="flex justify-center items-center gap-6">
                                        <a className="text-gray-700 dark:text-white hover:text-orange-600" aria-label="Visit LinkedIn" href="https://www.linkedin.com/in/lucas-caldas50/"
                                            target="_blank">
                                            <FaLinkedinIn size={24} />
                                        </a>
                                        <a className="text-gray-700 dark:text-white hover:text-orange-600" aria-label="Visit Facebook" href="https://www.instagram.com/lucas.mcaldas/"
                                            target="_blank">
                                            <FaInstagram size={24} />
                                        </a>
                                        <a className="text-gray-700 dark:text-white hover:text-orange-600" aria-label="Visit Instagram" href="https://github.com/lucastere10"
                                            target="_blank">
                                            <FaGithub size={24} />
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="https://www.linkedin.com/in/lucas-caldas50/" target="_blank">
                                        <Button  className="rounded-md" >Contato</Button>
                                    </a>
                                    <a href="https://lucastere10.github.io/portfolio" target="_blank">
                                        <Button  className="rounded-md text-white" variant={'secondary'} >Portfolio</Button>
                                    </a>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 dark:text-white">Habilidades</span>
                                <ul>
                                    <li className="mb-2">Python</li>
                                    <li className="mb-2">Django</li>
                                    <li className="mb-2">Java</li>
                                    <li className="mb-2">JavaScript</li>
                                    <li className="mb-2">React</li>
                                    <li className="mb-2">React Native</li>
                                    <li className="mb-2">Next.js</li>
                                    <li className="mb-2">Tailwind</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white dark:bg-[#202c34] shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Sobre Mim</h2>
                            <div className='flex mb-4'>
                                <div className='flex flex-col'>
                                    <p className="text-gray-700 dark:text-white">
                                        Lucas Caldas, estudante de Engenharia de Produção.
                                    </p>
                                    <p className="text-gray-700 dark:text-white">
                                        Tenho interesse em Programação e Data Science.
                                    </p>
                                    <p className="text-gray-700 dark:text-white">
                                        Atualmente praticando em projetos com foco em NextJs
                                    </p>
                                    <p className="text-gray-700 dark:text-white">
                                        Sinta-se a vontade para entra em Contato .
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <h2 className="text-2xl font-bold mt-3 mb-4">Experiências</h2>
                            <div className="mb-6">
                                <div className="flex justify-between flex-wrap gap-2 w-full">
                                    <span className="text-gray-700 font-bold">Serratec </span>
                                    <p>
                                        <span className="text-gray-700 mr-4">Segundo semestre 2023</span>
                                    </p>
                                </div>
                                <p className="mt-2">
                                    Participar do Programa de Residência em TIC do Serratec 2023 foi uma jornada de crescimento e descoberta. Durante cinco meses, adentrei no mundo da tecnologia, aprendendo não apenas sobre programação, mas também sobre como trabalhar em equipe e resolver problemas complexos. Foi uma experiência transformadora que nos equipou com as habilidades necessárias para prosperar no campo da tecnologia da informação e comunicação.
                                </p>
                            </div>
                            <hr />
                            <h2 className="text-2xl font-bold mt-3 mb-4">Projetos</h2>
                            <div className="mb-6">
                                <div className="flex justify-between flex-wrap gap-2 w-full">
                                    <span className="text-gray-700 font-bold">Djando REST</span>
                                    <p>
                                        <span className="text-gray-700 mr-4">Primeiro semestre 2023</span>
                                    </p>
                                </div>
                                <p className="mt-2">
                                    Desenvolvi um sistema de portfólio utilizando Django REST Framework com o intuito de aprofundar meus conhecimentos em Django e explorar suas funcionalidades.
                                </p>

                                <p className="mt-2">
                                    O sistema possui cadastro e login com autenticação, garantindo que apenas usuários autorizados possam acessar determinadas partes do site. Uma vez logados, os usuários podem criar posts ou editar seu perfil. Cada post pode conter texto, imagens ou ambos, permitindo aos usuários uma ampla gama de opções para personalizar seu portfólio.
                                </p>
                                <p className='font-bold ml-6 mt-2'>Link:  <a target="_blank" href='https://github.com/lucastere10/django-portfolio' className='ml-2 font-normal'>https://github.com/lucastere10/django-portfolio</a></p>
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between flex-wrap gap-2 w-full">
                                    <span className="text-gray-700 font-bold">Data Science</span>
                                    <p>
                                        <span className="text-gray-700 mr-4">Primeiro semestre 2023</span>
                                    </p>
                                </div>
                                <p className="mt-2">
                                    Meu portfólio de Machine Learning abrange uma variedade de projetos que utilizam algoritmos supervisionados e não supervisionados, análise exploratória de dados e técnicas de clusterização. Cada projeto reflete minha paixão por descobrir insights significativos nos dados e minha dedicação em aplicar as melhores práticas de Machine Learning
                                </p>
                                <p className='font-bold ml-6 mt-2'>Link:  <a target="_blank" href='https://lucastere10.github.io/portfolio/' className='ml-2 font-normal'>https://lucastere10.github.io/portfolio/</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



};

export default About;
