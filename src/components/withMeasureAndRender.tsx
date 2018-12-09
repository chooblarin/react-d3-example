import React from "react";

type ExternalProps = {};

type State = {
  measurement: ClientRect | null;
  hasMeasured: boolean;
};

export type InjectedProps = {
  width: number;
  height: number;
};

const withMeasureAndRender = <OriginalProps extends {}>(
  WrappedComponent:
    | React.ComponentClass<OriginalProps & InjectedProps>
    | React.StatelessComponent<OriginalProps & InjectedProps>
) => {
  type ResultProps = OriginalProps & ExternalProps;

  return class extends React.Component<ResultProps, State> {
    private elementRef: HTMLElement | null = null;

    constructor(props: ResultProps) {
      super(props);
      this.state = {
        measurement: null,
        hasMeasured: false
      };
      this.onWindowResize = this.onWindowResize.bind(this);
    }

    // TODO: might be better to debounce this method calls
    onWindowResize() {
      if (!this.elementRef) {
        return;
      }
      const rect = this.elementRef.getBoundingClientRect();
      this.setState({
        measurement: rect,
        hasMeasured: true
      });
    }

    componentDidMount() {
      window.addEventListener("resize", this.onWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.onWindowResize);
    }

    refCallback = (element: HTMLElement | null) => {
      if (element) {
        this.elementRef = element;
        const rect = element.getBoundingClientRect();
        this.setState({
          measurement: rect,
          hasMeasured: true
        });
      }
    };

    render() {
      const { measurement, hasMeasured } = this.state;
      return (
        <div style={{ width: "100%", height: "100%" }} ref={this.refCallback}>
          {hasMeasured ? (
            <WrappedComponent
              {...this.props}
              width={measurement!.width}
              height={measurement!.height}
            />
          ) : null}
        </div>
      );
    }
  };
};

export default withMeasureAndRender;
