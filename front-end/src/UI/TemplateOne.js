import React, { Children } from 'react'

const TemplateOne = ({ title, children }) => {
    const section = Children.map(children, child => child.type.displayName === 'Section' ? child : null)
    const sidebar = Children.map(children, child => child.type.displayName === 'Sidebar' ? child : null)
    return (
        <div className="py-10 px-4 sm:px-10 xl:px-24">
            <p className="text-amber-500 font-medium uppercase text-3xl mb-2">{ title }</p>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-2/3 lg:pr-10">
                    { section }
                </div>
                <div className="w-full lg:w-1/3 lg:pl-7">
                    { sidebar }
                </div>
            </div>
        </div>
    )
}

const Section = ({ children }) => children
Section.displayName = 'Section'
TemplateOne.Section = Section

const Sidebar = ({ children }) => children
Sidebar.displayName = 'Sidebar'
TemplateOne.Sidebar = Sidebar

export default TemplateOne