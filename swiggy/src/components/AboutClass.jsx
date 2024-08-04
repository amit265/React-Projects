import React from "react";


class AboutClass extends React.Component {
        constructor(props) {
            super(props);
        }

    render() {
        const {name, location} = this.props;

        return(
            <>
            <h2>Name: {this.props.name}</h2>
            <h3>Location: {this.props.location}</h3>
            </>
        )
    }

}

export default AboutClass;