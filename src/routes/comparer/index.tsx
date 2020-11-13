import { History } from "history";
import { FunctionalComponent, h } from "preact"
import VideosWrapper, { VideosWrapperProps } from "../../components/video/wrappers/VideosWrapper";

export type ComparerProps = Partial<VideosWrapperProps>

const Comparer: FunctionalComponent<ComparerProps> = ({ targetId, opportunityId }: ComparerProps) => {
    if (targetId != null && opportunityId != null) {
        return <VideosWrapper targetId={targetId} opportunityId={opportunityId} />
    }

    return <div>No laps specified!</div>
}

export default Comparer;
