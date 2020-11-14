import { Component, FunctionalComponent, h } from "preact"
import { Button, Control, Section, Title } from "preact-bulma";
import InputFormField from "../../components/form/input_form_field";
import VideosWrapper, { VideosWrapperProps } from "../../components/video/wrappers/videos_wrapper";
import { getId } from "../../util/youtube_util";

export type ComparerProps = Partial<VideosWrapperProps>
export type ComparerState = {
    targetId: string,
    opportunityId: string
}

export class Comparer extends Component<ComparerProps, ComparerState> {
    setTarget = (value: string) => {
        this.setState({
            targetId: getId(value)!
        })
    }

    setOpportunity = (value: string) => {
        this.setState({
            opportunityId: getId(value)!
        })
    }

    submit = () => {
        const { targetId, opportunityId } = this.state
        window.location.href = `${window.location.href}/${targetId}/${opportunityId}`
    }

    render({ targetId, opportunityId }: ComparerProps) {
        if (targetId != null && opportunityId != null) {
            return <VideosWrapper targetId={targetId} opportunityId={opportunityId} />
        }

        return (
            <div class="container">
                <Section>
                    <Title>Compare Videos</Title>
                </Section>
                <Section>
                    <InputFormField onChange={this.setTarget} name="target_video" label="First video" placeholder="Enter YouTube URL here (e.g https://www.youtube.com/watch?v=sPlJBmtnzEl)" />
                    <InputFormField onChange={this.setOpportunity} name="opportunity_video" label="Second video" placeholder="Enter YouTube URL here (e.g https://www.youtube.com/watch?v=sPlJBmtnzEl)" />

                    <Control>
                        <Button color="primary" onClick={this.submit}>Compare Videos</Button>
                    </Control>
                </Section>
            </div>
        )
    }
}

export default Comparer;
