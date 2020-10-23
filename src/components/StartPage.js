import React from 'react';
import { connect } from 'react-redux';
import { startAddMemory, startSetMemories } from '../actions/memories';

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
        const numberOfMemories = Object.keys(this.props.memories).length;
        const happyIndex = Math.floor(Math.random()*numberOfMemories);
        const happyMemory = this.props.memories[happyIndex].val;
        this.state = {
            happyIndex,
            happyMemory,
            memory: '',
            submit: false
        };
    }

    changeMemory = () => { // Change memory being displayed
        const numberOfMemories = Object.keys(this.props.memories).length;
        const happyIndex = Math.floor(Math.random()*numberOfMemories);
        const happyMemory = this.props.memories[happyIndex].val;
        this.setState(() => ({ happyIndex, happyMemory }));
    }

    onSubmit = (e) => { // Add memory to database
        e.preventDefault();

        const memory = this.state.memory;
        if (!!memory) {
            this.props.startAddMemory(memory);
            this.setState(() => ({
                memory: '',
                submit: true
            }));
            this.props.startSetMemories(); // overkill
        } else {
            // need to fix errors, maybe add alert? 
        }
    }

    onTextChange = (e) => {
        const memory = e.target.value;
        this.setState(() => ({ memory }));
    };

    componentDidMount() {
        this.interval = setInterval(() => this.changeMemory(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
            <div className='box-layout'>
                <div className='box-layout__box'>
                    <h1 className='box-layout__title'>Happy Memories</h1>
                    <div className='box-layout__happy'>
                        { this.state.happyMemory }
                    </div>
                </div>

                <div></div>

                <div className='box-layout__box'>
                    <h1 className='box-layout__title'>Share a Memory</h1>
                    <h3 className='box-layout__title'>(Or two or three)</h3>
                    <div className='input-group'>
                        <div className='input-group__item'>
                            <textarea
                                className='text-input'
                                maxLength='250'
                                placeholder='That time he did that great thing! --John'
                                value={this.state.memory}
                                onChange={this.onTextChange}
                            />
                            <div className='input-group__subscript'>
                                {250 - this.state.memory.length} characters remaining
                            </div>
                        </div>
                        <div className='input-group__item'>
                            <button className='button' onClick={this.onSubmit}>Submit</button>
                            <div className='submit'>
                                <p>{ this.state.submit ? 'Thank you!' : ' '}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddMemory: (memory) => dispatch(startAddMemory(memory)),
    startSetMemories: () => dispatch(startSetMemories())
});

const mapStateToProps = (state) => {
    return {
        memories: state.memories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);